export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        loading="lazy"
        src="/images/loading.gif"
        alt="Loading Page"
        width={80}
      />
    </div>
  );
}

