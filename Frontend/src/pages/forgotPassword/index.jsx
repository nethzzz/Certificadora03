import "../home/styles.css";
import "../login/login.css";

export default function ForgotPassword() {
  return (
    <main className="ld-login-main">
      <section className="ld-login-card">
        <h1 className="ld-login-title">Recuperar senha</h1>

        <p className="ld-login-helper">
          Digite o e-mail cadastrado para enviarmos um link de recuperação:
        </p>

        <form className="ld-login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="ld-form-group">

            <input
              id="email"
              type="email"
              className="ld-input"
              placeholder="seu@email.com"
              required
            />
          </div>

          <button type="submit" className="ld-btn ld-btn-search ld-btn-login">
            Enviar link
          </button>
        </form>

        <p className="ld-form-note ld-login-back">
          Lembrou sua senha? <a href="/login">Voltar para o login</a>
        </p>
      </section>
    </main>
  );
}