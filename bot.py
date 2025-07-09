from pyrogram import Client, filters
from pyrogram.types import InlineKeyboardMarkup, InlineKeyboardButton

import os

BOT_TOKEN = os.environ.get("BOT_TOKEN")
API_ID = int(os.environ.get("API_ID"))
API_HASH = os.environ.get("API_HASH")

# List of your private channel usernames or IDs (example: -1001234567890)
CHANNELS = [
    -1002586828025,
    -1002621974008,
    -1002893720714,
    -1002865374360,
    -1002687246630,
    -1002833036619,
    -1002851612124
]

app = Client("movie_bot", bot_token=BOT_TOKEN, api_id=API_ID, api_hash=API_HASH)

@app.on_message(filters.private & filters.text)
async def search_handler(client, message):
    query = message.text.lower()
    results = []

    for channel in CHANNELS:
        async for msg in app.search_messages(channel, query, limit=5):
            results.append({
                "channel": channel,
                "msg_id": msg.message_id,
                "title": (msg.caption or msg.text or "Untitled")[:40]
            })

    if not results:
        await message.reply("❌ No results found.")
        return

    buttons = []
    for res in results:
        buttons.append([
            InlineKeyboardButton(
                text=res['title'],
                callback_data=f"fwd|{res['channel']}|{res['msg_id']}"
            )
        ])

    await message.reply(
        "✅ Select the movie you want:",
        reply_markup=InlineKeyboardMarkup(buttons)
    )

@app.on_callback_query(filters.regex("^fwd"))
async def forward_movie(client, callback_query):
    _, channel_id, msg_id = callback_query.data.split("|")

    try:
        await app.forward_messages(
            chat_id=callback_query.message.chat.id,
            from_chat_id=int(channel_id),
            message_ids=int(msg_id)
        )
        await callback_query.answer("✅ Sent!")
    except Exception as e:
        await callback_query.answer("❌ Failed to forward.")

app.run()
