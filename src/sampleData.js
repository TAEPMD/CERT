import { BadgeCheck, CalendarClock, FileCheck2, ShieldCheck } from "lucide-react";

export const metrics = [
  { label: "ออกใบประกาศแล้ว", value: "3,842", icon: FileCheck2 },
  { label: "ครบกำหนดต่ออายุ", value: "126", icon: CalendarClock },
  { label: "คำขอตรวจสอบ", value: "418", icon: ShieldCheck },
  { label: "ยืนยันสำเร็จ", value: "98.7%", icon: BadgeCheck }
];

export const cohorts = [
  { course: "การปฐมพยาบาลและช่วยปฏิบัติการแพทย์ขั้นพื้นฐาน" },
  { course: "Emergency Medical Responder" },
  { course: "การเตรียมพร้อมรับภัยพิบัติด้านการแพทย์ฉุกเฉิน" },
  { course: "อำนวยการปฏิบัติการฉุกเฉินการแพทย์" }
];

export const certificateRows = [
  {
    id: "cert-001",
    certNo: "NIEM-EMR-2569-0012",
    name: "วรัญญา สุขประเสริฐ",
    course: "Emergency Medical Responder",
    cohort: "EMR รุ่น 12",
    issueDate: "2569-01-18",
    expireDate: "2572-01-17",
    status: "active",
    verifier: "ระบบออกใบประกาศ",
    sheetRow: 12
  },
  {
    id: "cert-002",
    certNo: "NIEM-BLS-2568-0341",
    name: "ธนภัทร ศรีกุล",
    course: "การปฐมพยาบาลและช่วยปฏิบัติการแพทย์ขั้นพื้นฐาน",
    cohort: "BLS รุ่น 34",
    issueDate: "2568-05-09",
    expireDate: "2569-05-08",
    status: "renewal",
    verifier: "รอเจ้าหน้าที่ตรวจสอบ",
    sheetRow: 41
  },
  {
    id: "cert-003",
    certNo: "NIEM-DIS-2567-0088",
    name: "กมลชนก พรหมมาศ",
    course: "การเตรียมพร้อมรับภัยพิบัติด้านการแพทย์ฉุกเฉิน",
    cohort: "DIS รุ่น 8",
    issueDate: "2567-11-22",
    expireDate: "2570-11-21",
    status: "active",
    verifier: "QR public verification",
    sheetRow: 88
  },
  {
    id: "cert-004",
    certNo: "NIEM-EMS-2566-0199",
    name: "พีรพัฒน์ อินทรจันทร์",
    course: "อำนวยการปฏิบัติการฉุกเฉินการแพทย์",
    cohort: "EMS Command รุ่น 19",
    issueDate: "2566-03-14",
    expireDate: "2569-03-13",
    status: "expired",
    verifier: "หมดอายุตามรอบ",
    sheetRow: 199
  },
  {
    id: "cert-005",
    certNo: "NIEM-EMR-2569-0027",
    name: "ศุภวิชญ์ วัฒนานุกูล",
    course: "Emergency Medical Responder",
    cohort: "EMR รุ่น 12",
    issueDate: "2569-01-18",
    expireDate: "2572-01-17",
    status: "pending",
    verifier: "รอ sync Google Sheets",
    sheetRow: 27
  }
];

export const syncEvents = [
  {
    title: "บันทึกลงทะเบียนกลาง",
    detail: "สร้าง record พร้อมเลขที่ใบประกาศและวันหมดอายุ"
  },
  {
    title: "สร้าง QR ตรวจสอบ",
    detail: "ผูกกับหน้า verify บน Vercel เพื่อให้หน่วยงานภายนอกตรวจสอบได้"
  },
  {
    title: "บันทึกเวอร์ชัน",
    detail: "GitHub เก็บประวัติ schema, template และ workflow deployment"
  }
];
