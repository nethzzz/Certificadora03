import React from "react";
import "./styles.css";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <main>
        <section className="ld-banner">
          <div className="ld-banner-inner">
            <h1 className="ld-banner-title">
              Conectando Pessoas ao <br/>
              projeto Meninas Digitais <br/>
            </h1>

            <p className="ld-banner-subtitle">
              Junte-se a nós e faça parte da transformação.
            </p>

            <div className="ld-cta">
              <a className="ld-cta-support" href="#participar">Quero apoiar/voluntariar</a>
              <a className="ld-cta-participants" href="#apoiar">Ver participantes</a>
            </div>
          </div>
        </section>

        <section id="info" className="ld-info" >
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
                  Mostramos com clareza como o projeto funciona, onde atuamos e qual impacto geramos. Acreditamos que informações acessíveis fortalecem a confiança de voluntários, apoiadores e participantes.
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
                    Unimos pessoas que acreditam no poder da educação e da tecnologia para transformar vidas. Aqui, cada voluntário e apoiador faz parte de uma rede colaborativa que inspira meninas e mulheres a seguirem carreira em STEM.
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
                    Oferecemos um processo simples e intuitivo para quem deseja se engajar. Em poucos passos, você pode participar, apoiar e acompanhar as atividades do projeto de maneira prática e acessível.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section id="quem-somos" className="ld-about">
          <div className="ld-container">
            <h1>Sobre Nós</h1>

            <div className = "ld-about-content">
              <div className="ld-about-text">
                <p>
                  O projeto Meninas Digitais – UTFPR-CP visa contribuir para o aumento da participação de meninas e mulheres em computação e STEM (sigla em inglês para ciência, tecnologia, engenharia e matemática), incentivando e auxiliando meninas estudantes de ensino fundamental e médio de Cornélio Procópio a seguirem carreira nessas áreas. Para isso, o projeto tem como estratégia o ensino de temas em computação e STEM voltados à resolução de desafios de sustentabilidade alinhados com os Objetivos de Desenvolvimento Sustentável (ODS), a partir de mentorias, oficinas, palestras, minicursos e mesas redondas, com foco em capacitar e estimular o aprendizado de meninas e mulheres nessas áreas, demonstrando como essas podem causar impacto positivo na sociedade. Busca-se, dessa forma, contribuir para a redução da desigualdade de gênero no Campus da universidade, tornando o ambiente mais igualitário, diverso e inclusivo, bem como ampliar as perspectivas de trabalho de meninas e mulheres, auxiliando-as em sua independência a partir da educação de qualidade.
                </p>
              </div>

              <div className="ld-about-image">
                <img src="FotoEquipe.png" alt="Foto Meninas Digitais"/>
              </div>
            </div>
          </div>
        </section>
              
        <section id="como-participar" className="ld-how" >
          <div className="ld-container">
            <h1>Como participar</h1>

            <div className="ld-cards">
              <article className="ld-card">
                <span className="ld-badge ld-badge-vol">Voluntariar</span>
                <h3 className="ld-card-title">Voluntariar</h3>
                <p className="ld-card-desc">
                  Candidate-se para colaborar em projetos e atividades do programa,
                  contribuindo com suas habilidades e aprendizados.
                </p>
                <p className="ld-card-desc" >É necessário ser estudante da UTFPR-CP para tornar-se voluntário</p>
                <a href="#quero-voluntariar" className="ld-card-btn ld-card-btn-vol">Quero voluntariar</a>
              </article>

              <article className="ld-card">
                <span className="ld-badge ld-badge-apoio">Apoiar</span>
                <h3 className="ld-card-title">Apoiar</h3>
                <p className="ld-card-desc">
                  Contribua financeiramente ou com recursos para viabilizar iniciativas, ampliar o impacto do projeto 
                  e ajudar a manter nossas ações em expansão.
                </p>
                <p className="ld-card-desc">Não é necessário ser estudante da UTFPR-CP para apoiar o projeto</p>
                <a href="#quero-apoiar" className="ld-card-btn ld-card-btn-apoio">Quero apoiar</a>
              </article>
            </div>
          </div>
        </section>

        <section id="busca" className="search" >
          <div className="ld-container">
            <h1>Buscar voluntários e apoiadores</h1>
              
            <div className="ld-search">
              <form className="ld-search-FORM" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="ld-input"
                  type="search"
                  placeholder="Buscar por nome ou e-mail..."
                  aria-label="Buscar por nome ou e-mail"
                />
                <button className="ld-btn ld-btn-search">Buscar</button>
              </form>

              <p className="ld-note">Apenas nome e e-mail são públicos.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className ="ld-footer">
        <div className="ld-footer-grid">
          <div className="ld-footer-left">
            <h3>Entre em contato com a gente!</h3>

            <form className="ld-footer-form">
              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="E-mail" />
              <textarea placeholder="Sua mensagem"></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>

          <div className="ld-footer-right">
            <div>
              <p className="ld-footer-label">Nosso e-mail</p>
              <p className="ld-footer-info">meninasdigitaisutfprcp@gmail.com</p>
            </div>

            <div>
              <p className="ld-footer-label">Nossas redes sociais</p>

              <div className="ld-footer-social">
                <a
                  href="https://www.instagram.com/meninasdigitaisutfprcp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.linkedin.com/company/meninas-digitais-utfpr-cp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://www.facebook.com/people/Meninas-Digitais-UTFPR-CP/61552155907224/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ld-footer-bottom">
          <p>© {new Date().getFullYear()} Meninas Digitais – UTFPR-CP</p>
        </div>
      </footer>
    </>
  );
}