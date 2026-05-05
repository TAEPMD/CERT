# NIEM Certificate Platform

แพลตฟอร์มกลางสำหรับบริหารจัดการใบประกาศของวิทยาลัยวิชาการเตรียมความพร้อมด้านการแพทย์ฉุกเฉิน ครอบคลุม workflow ออกใบประกาศ ต่ออายุ ตรวจสอบ และ sync ข้อมูลกับ Google Sheets

## Stack

- React + Vite สำหรับ frontend
- Google Sheets ผ่าน Google Apps Script Web App เป็นฐานข้อมูลกลาง
- GitHub สำหรับ version control และ audit การเปลี่ยน schema/template
- Vercel สำหรับ deploy และตั้งค่า environment variables

## Run Local

```bash
npm install
npm run dev
```

เปิดที่ `http://127.0.0.1:5173`

## Routes

- `/` หน้า landing page สำหรับแนะนำระบบ
- `/verify` หน้า home/public verification สำหรับบุคคลภายนอกตรวจสอบใบประกาศ
- `/admin` หน้า dashboard สำหรับเจ้าหน้าที่ออกใบประกาศ ต่ออายุ และจัดการทะเบียน

## Environment Variables

คัดลอกจาก `.env.example` เป็น `.env.local`

```bash
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_CERTIFICATE_VERIFY_BASE_URL=https://your-vercel-domain.vercel.app/verify
VITE_GITHUB_REPOSITORY=your-org/niem-certificate-platform
```

ถ้ายังไม่ตั้ง `VITE_GOOGLE_SHEETS_WEB_APP_URL` ระบบจะใช้ mock sync เพื่อให้ทดลอง UI ได้ก่อน

## Google Sheets Schema

แนะนำให้ใช้ชีตชื่อ `certificates` พร้อมคอลัมน์:

| Column | Meaning |
| --- | --- |
| id | รหัส record |
| certNo | เลขที่ใบประกาศ |
| name | ผู้รับใบประกาศ |
| course | หลักสูตร |
| cohort | รุ่นอบรม |
| issueDate | วันที่ออก |
| expireDate | วันหมดอายุ |
| status | active, renewal, expired, pending |
| verifier | ผู้บันทึกหรือสถานะระบบ |
| updatedAt | เวลาปรับปรุงล่าสุด |

## Apps Script Endpoint

ตัวอย่าง payload ที่ frontend ส่งไป:

```json
{
  "action": "certificate.create",
  "payload": {
    "certNo": "NIEM-EMR-2569-0012",
    "name": "ชื่อผู้รับใบประกาศ",
    "course": "Emergency Medical Responder",
    "cohort": "EMR รุ่น 12",
    "issueDate": "2026-05-03",
    "expireDate": "2029-05-02",
    "status": "active"
  }
}
```

## Deploy

1. สร้าง GitHub repository แล้ว push โฟลเดอร์นี้
2. Import repository เข้า Vercel
3. ตั้ง environment variables ตาม `.env.example`
4. Deploy ด้วย command `npm run build` และ output directory `dist`
