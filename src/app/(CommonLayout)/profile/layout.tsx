export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
}
