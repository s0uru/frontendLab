function ProfileParagraph({ label, title }) {
  return (
    <div className="mb-3">
      <strong className="text-primary d-block mb-1">{label}:</strong>
      <p className="text-muted mb-0 pl-2">{title}</p>
    </div>
  );
}

export default ProfileParagraph;