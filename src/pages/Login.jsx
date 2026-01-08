import AuthLayout from "../components/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      title="Sign in to CodeCompanion"
      subtitle="Welcome back. Please enter your details."
    >
      <form>
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

        <button className="btn primary">Sign In</button>
      </form>

      <div className="auth-footer">
        Don’t have an account? <a href="/signup">Create one</a>
      </div>
    </AuthLayout>
  );
}
