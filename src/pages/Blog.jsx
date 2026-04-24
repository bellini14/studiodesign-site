const posts = [
  {
    eyebrow: 'Estratégia',
    title: 'Marcas que se mantêm relevantes quando o mercado muda',
    summary:
      'Como clareza de posicionamento, consistência visual e decisões editoriais ajudam uma marca a atravessar novos ciclos.',
  },
  {
    eyebrow: 'Identidade',
    title: 'Sistemas visuais preparados para crescer',
    summary:
      'Notas sobre grids, tipografia, motion e linguagem para marcas que precisam funcionar em múltiplos canais.',
  },
  {
    eyebrow: 'Cultura',
    title: 'O futuro como prática de design',
    summary:
      'Uma leitura sobre pesquisa, intenção e repertório como ferramentas para criar marcas mais precisas.',
  },
];

const Blog = () => {
  return (
    <div className="bg-base min-h-screen text-primary">
      <section className="pt-40 pb-20 w-full flex justify-center">
        <div className="site-shell">
          <span className="text-[#ff3b00] text-[0.75rem] font-semibold tracking-[0.2em] uppercase block mb-6">
            Blog
          </span>
          <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-semibold m-0 leading-none text-primary">
            Futuros
          </h1>
        </div>
      </section>

      <section className="w-full pb-40 flex justify-center">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[35px] gap-y-12">
            {posts.map((post) => (
              <article
                key={post.title}
                className="border-t border-borderline/50 pt-8 transition-transform duration-500 hover:-translate-y-2"
              >
                <span className="text-[#ff3b00] text-[0.72rem] font-semibold tracking-[0.18em] uppercase block mb-6">
                  {post.eyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-medium leading-tight mb-5">
                  {post.title}
                </h2>
                <p className="text-secondary text-base leading-relaxed">
                  {post.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
