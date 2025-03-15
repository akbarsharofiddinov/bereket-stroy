export const formatPhoneNumber = (input: string): string => {
  // Faqat raqamlarni olish (`+`, `-`, ` ` belgilarni olib tashlash)
  const numbersOnly = input.replace(/[^0-9]/g, "");

  // Telefon raqam uzunligini tekshirish
  if (numbersOnly.length === 9) {
    // 9 ta raqamli telefon raqam (masalan: "901234567")
    return `+${numbersOnly.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{2})$/,
      "$1 $2 $3 $4"
    )}`;
  } else if (numbersOnly.length === 12) {
    // 12 ta raqamli telefon raqam (masalan: "998901234567")
    return `+${numbersOnly.replace(
      /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
      "$1 $2 $3 $4 $5"
    )}`;
  } else {
    // Agar raqam formati noto‘g‘ri bo‘lsa, o‘zgartirmasdan qaytarish
    return `+${numbersOnly}`;
  }
};
