import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your journey with CodeCompanion."
    >
      <form>
        <input
          type="text"
          placeholder="Full name"
          className="input"
        />

        <input
          type="email"
          placeholder="Email"
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
        />

        <button className="btn primary">Create Account</button>
      </form>

      <div className="auth-footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </AuthLayout>
  );
}
