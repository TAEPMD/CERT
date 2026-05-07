export const statusLabel = {
  active: "ใช้งานได้",
  renewal: "ใกล้หมดอายุ",
  expired: "หมดอายุ",
  pending: "รอตรวจสอบ"
};

export const statusIconMap = {
  active: "CheckCircle2",
  renewal: "CalendarClock",
  expired: "XCircle",
  pending: "Loader2"
};

export const navItems = [
  ["dashboard", "ภาพรวม", "LayoutDashboard"],
  ["issue", "ออกใบประกาศ", "FilePlus2"],
  ["renew", "ต่ออายุ", "RefreshCcw"],
  ["verify", "ตรวจสอบ", "ShieldCheck"],
  ["cohorts", "รุ่นอบรม", "GraduationCap"],
  ["recipients", "ผู้รับใบประกาศ", "UsersRound"],
  ["reports", "รายงาน", "ListChecks"],
  ["settings", "ตั้งค่า", "Settings"]
];

export const syncEvents = [
  {
    title: "บันทึกลงทะเบียนกลาง",
    detail: "อ่านและเขียนข้อมูลกับ Google Sheets จากทะเบียนจริงของระบบ"
  },
  {
    title: "สร้างลิงก์ตรวจสอบ",
    detail: "ใช้เลขที่ใบประกาศจริงสำหรับหน้า verify ที่เผยแพร่ภายนอก"
  },
  {
    title: "ติดตามการเปลี่ยนแปลง",
    detail: "การเปลี่ยนสถานะและการต่ออายุจะอ้างอิงข้อมูลล่าสุดจาก registry"
  }
];

export const statusFilters = [
  ["all", "ทั้งหมด"],
  ["active", "ใช้งานได้"],
  ["renewal", "ใกล้หมดอายุ"],
  ["expired", "หมดอายุ"]
];
