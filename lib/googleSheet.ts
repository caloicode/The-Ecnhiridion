// lib/googleSheet.ts
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const GOOGLE_CREDS_BASE64 = process.env.GOOGLE_CREDS_JSON_BASE64;
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!GOOGLE_CREDS_BASE64 || !SPREADSHEET_ID) {
  throw new Error('Missing GOOGLE_SHEET_ID or GOOGLE_CREDS_JSON_BASE64 in environment variables');
}

const credentials = JSON.parse(Buffer.from(GOOGLE_CREDS_BASE64, 'base64').toString());

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function fetchEnchiridionData() {
  const range = 'enchiridion-html-format';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) return [];

  const [header, ...dataRows] = rows;
  const [_, __, ___, carterKey, higginsonKey, mathesonKey, waltonKey] = header;

  return dataRows.map((row) => {
    const [id, chapter, title, carter, higginson, matheson, walton] = row;

    return {
      id: Number(id),
      chapter,
      title,
      translations: {
        carter,
        higginson,
        matheson,
        walton,
      },
    };
  });
}