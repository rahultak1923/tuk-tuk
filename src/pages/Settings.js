export default function Settings() {
  return (
    <div className="container py-4">
      <h4>Settings</h4>

      <div className="card mt-3">
        <div className="list-group list-group-flush">
          <div className="list-group-item">Account</div>
          <div className="list-group-item">Edit Profile</div>
          <div className="list-group-item text-danger">Logout</div>
        </div>
      </div>
    </div>
  );
}