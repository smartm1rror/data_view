// app/data.ts

export type PageData = {
  acneLevel: string;
  skinLevel: string;
  personalColor: string;
  pcConfidence: string;
  confidence: string;
};

const personalColorMap: Record<string, string> = {
  winter: "겨울톤",
  spring: "봄톤",
  summer: "여름톤",
  fall: "가을톤",
};

export const getKoreanPageData = async (searchParams: URLSearchParams): Promise<PageData> => {
  const acneLevel = searchParams.get("acne_level") ?? "-";
  const processedAcneLevel = `0 ~ 10 (현재 값: ${acneLevel})`;

  const confidenceRaw = searchParams.get("confidence");
  let confidence = "-";
  // 숫자 문자열인지 체크 (정규식 사용)
  if (
    confidenceRaw !== null &&
    confidenceRaw !== undefined &&
    confidenceRaw !== "" &&
    confidenceRaw !== "-" &&
    /^-?\d*\.?\d+$/.test(confidenceRaw)
  ) {
    confidence = `${Math.round(Number(confidenceRaw) * 100)}%`;
  }

  const skinLv = searchParams.get("skin_lv") ?? "-";
  const personalColor = searchParams.get("personal_color") ?? "-";
  const pcConfidence = searchParams.get("pc_confidence") ?? "-";

  return {
    acneLevel: processedAcneLevel,
    skinLevel: skinLv,
    personalColor: personalColorMap[personalColor.toLowerCase()] ?? personalColor,
    pcConfidence,
    confidence,
  };
};
