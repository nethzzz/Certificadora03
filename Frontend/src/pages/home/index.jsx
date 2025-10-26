import React from "react";
import "./styles.css";


export default function Home() {
  return (
    <>
    <header className="ld-header">
      <div className="ld-container">
        <a href="#" className="ld-logo" aria-label="Meninas Digitais - Início">
          <img src="/logo.png" alt="Logo Meninas Digitais" className="ld-logo-image" />
          <span>Laços Digitais</span>
        </a>

        <nav className="ld-nav" aria-label="principal">
          <a href="#como-participar">Como participar?</a>
          <a href="#quem-somos">Quem Somos</a>
          <a href="#participantes">Participantes</a>
          <a href="#apoiadores">Apoiadores</a>
        </nav>

        <div className="ld-actions">
          <button className="ld-btn">Cadastre-se</button>
          <button className="ld-btn">Login</button>

          <button
            className="ld-burger"
            aria-label="Abrir menu"
            aria-expanded="false"
            onClick={() => document.body.classList.toggle("ld-nav-open")}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>

    <main>
      <section className="ld-banner">
        <div className="ld-banner-inner">
          <h1 className="ld-banner-title">
            Conectando Pessoas ao <br/>
            projeto Meninas Digitais <br/>
          </h1>

          <p className="ld-banner-subtitle">
            A plataforma que conecta e 
          </p>

        <div className="ld-cta">
          <a className="ld-cta-support" href="#participar">Quero apoiar/voluntariar</a>
          <a className="ld-cta-participants" href="#apoiar">Ver participantes</a>
        </div>
        </div>
      </section>

        <section className="ld-info" id="info">
          <div className="ld-container">
            <div className="ld-features">
              <article className="ld-feature">
                <svg
                  viewBox="0 0 24 24"
                  className="ld-feature-icon"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="ld-feature-title">Transparência</h3>
                <p className="ld-feature-desc">
                  Satbra a transparência sobre o plutornica
                </p>
              </article>

              <article className="ld-feature">
                <svg
                  viewBox="0 0 24 24"
                  className="ld-feature-icon"
                  aria-hidden="true"
                >
                  <path
                    d="M16 11a4 4 0 10-3.999-4A4 4 0 0016 11zM8 12a3 3 0 10-3-3 3 3 0 003 3zm8 2c-3.333 0-6 2-6 4v2h12v-2c0-2-2.667-4-6-4zM8 14c-2.667 0-5 1.6-5 3.5V19h6v-1.5C9 15.6 10.2 14.7 12 14a9.3 9.3 0 00-4-.0z"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="ld-feature-title">Comunidade</h3>
                <p className="ld-feature-desc">
                  Premover onbramcais e affilar sobrem
                </p>
              </article>

              <article className="ld-feature">
                <svg
                  viewBox="0 0 24 24"
                  className="ld-feature-icon"
                  aria-hidden="true"
                >
                  <path
                    d="M21.7 13.35l-5.03-5.02a6 6 0 01-7.37 7.37l5.02 5.03a2 2 0 002.83 0l4.55-4.55a2 2 0 000-2.83zM7 13a4 4 0 100-8 4 4 0 000 8z"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="ld-feature-title">Facilidade</h3>
                <p className="ld-feature-desc">
                  Gestão de instrumentar o projeto titisiscao
                </p>
              </article>
            </div>

          <section className="ld-about">
            <div className="ld-container">
              <h1 className="ld-about-title">Sobre Nós</h1>
              <p className="ld-about-text">O projeto Meninas Digitais – UTFPR-CP visa contribuir para o aumento da participação de meninas e mulheres em computação e STEM (sigla em inglês para ciência, tecnologia, engenharia e matemática), incentivando e auxiliando meninas estudantes de ensino fundamental e médio de Cornélio Procópio a seguirem carreira nessas áreas. Para isso, o projeto tem como estratégia o ensino de temas em computação e STEM voltados à resolução de desafios de sustentabilidade alinhados com os Objetivos de Desenvolvimento Sustentável (ODS), a partir de mentorias, oficinas, palestras, minicursos e mesas redondas, com foco em capacitar e estimular o aprendizado de meninas e mulheres nessas áreas, demonstrando como essas podem causar impacto positivo na sociedade. Busca-se, dessa forma, contribuir para a redução da desigualdade de gênero no Campus da universidade, tornando o ambiente mais igualitário, diverso e inclusivo, bem como ampliar as perspectivas de trabalho de meninas e mulheres, auxiliando-as em sua independência a partir da educação de qualidade.</p>
            </div>
          </section>
            
          <section className="ld-how" id="como-participar">
            <div className="ld-container">
            <h2 className="ld-section-title">Como participar</h2>

            <div className="ld-cards">
              <article className="ld-card">
                <span className="ld-badge ld-badge-vol">Voluntariar</span>
                <h3 className="ld-card-title">Voluntariar</h3>
                <p className="ld-card-desc">
                  Candidate-se para colaborar em projetos e atividades do programa,
                  contribuindo com suas habilidades e aprendizados.
                </p>
                <a href="#quero-voluntariar" className="ld-card-btn ld-card-btn-vol">
                  Quero voluntariar
                </a>
              </article>

              <article className="ld-card">
                <span className="ld-badge ld-badge-apoio">Apoiar</span>
                <h3 className="ld-card-title">Apoiar</h3>
                <p className="ld-card-desc">
                  Contribua financeiramente ou com recursos para viabilizar iniciativas
                  e ampliar o impacto do projeto.
                </p>
                <a href="#quero-apoiar" className="ld-card-btn ld-card-btn-apoio">
                  Quero apoiar
                </a>
              </article>
              </div>
            </div>
          </section>

            <form className="ld-search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="ld-input"
                type="search"
                placeholder="Buscar por nome ou e-mail..."
                aria-label="Buscar por nome ou e-mail"
              />
              <button className="ld-btn ld-btn-search">Buscar</button>
            </form>

            <p className="ld-note">
              Apenas nome e e-mail são públicos.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}