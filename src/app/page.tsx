// app/page.tsx

import { getKoreanPageData } from "./data";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const paramsObj = await searchParams;

  // URLSearchParams 변환
  const urlParams = new URLSearchParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (Array.isArray(value)) urlParams.set(key, value[0] ?? "");
    else if (value !== undefined) urlParams.set(key, value);
  });

  const data = await getKoreanPageData(urlParams);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 8px 12px 8px",
      }}
    >
      {/* 상단 타이틀 */}
      <header style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        textAlign: "center",
        marginBottom: "16px"
      }}>
        <h1 style={{
          fontSize: "2.1rem",
          fontWeight: 800,
          color: "#1976d2",
          letterSpacing: "-1.5px",
          margin: 0,
          lineHeight: 1.1,
        }}>
          얼굴 데이터 분석 결과지
        </h1>
      </header>

      {/* 결과 카드 */}
      <section
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "28px 20px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2 style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#222",
          marginBottom: "8px",
          letterSpacing: "-0.5px"
        }}>피부 진단 결과</h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <InfoRow label="여드름 단계" value={data.acneLevel} />
          <InfoRow label="피부 레벨" value={data.skinLevel} />
          <InfoRow label="퍼스널 컬러" value={data.personalColor} subLabel={`신뢰도: ${data.pcConfidence}`} />
          <InfoRow label="AI 신뢰도 점수" value={data.confidence} />
        </div>
      </section>

      {/* 하단 크레딧 */}
      <footer style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        textAlign: "center",
        marginTop: "24px"
      }}>
        <span style={{
          fontSize: "0.95rem",
          color: "#aaa",
          letterSpacing: "-0.5px"
        }}>
          경남대 졸업작품 - 스프링할조
        </span>
      </footer>
    </main>
  );
}

// 모바일 친화적 정보 행 컴포넌트
function InfoRow({ label, value, subLabel }: { label: string; value: string; subLabel?: string }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      background: "#f8fafc",
      borderRadius: "12px",
      padding: "12px 14px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
    }}>
      <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#333" }}>{label}</span>
      <span style={{ fontSize: "1.18rem", fontWeight: 700, color: "#1976d2", marginTop: "2px" }}>{value}</span>
      {subLabel && (
        <span style={{ fontSize: "0.95rem", color: "#888", marginTop: "1px" }}>{subLabel}</span>
      )}
    </div>
  );
}
