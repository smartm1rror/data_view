type PageProps = {
    params: Promise<{ params: string[] }>;
};

export default async function Page({ params }: PageProps) {

    const { params: paramArr } = await params;
    const [level, text, mindset] = paramArr || [];

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#fafafa",
                padding: "16px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    padding: "24px",
                    textAlign: "left",
                }}
            >
                <div style={{ marginBottom: "16px" }}>
                    <strong>Level:</strong> {level}
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <strong>Text:</strong> {text}
                </div>
                <div>
                    <strong>Mindset:</strong> {mindset}
                </div>
            </div>
        </main>
    );
}
