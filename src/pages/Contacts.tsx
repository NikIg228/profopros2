export default function ContactsPage() {
  return (
    <section className="container-balanced mt-10">
      <div className="grid gap-6">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold">Контакты</h1>
          <p className="mt-2 text-muted">Мы открыты к вопросам и предложениям.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 grid gap-3">
            <h2 className="text-lg font-semibold">Как с нами связаться</h2>
            <div className="text-muted">
              Email: support@ProfiLevelUp.example
            </div>
            <div className="text-muted">
              Телефон: +7 (707) 000-00-00
            </div>
            <div className="text-muted">
              Адрес: г. Алматы, ул. Абая 10
            </div>
            <div className="text-muted">
              Режим работы: Пн–Пт 10:00–19:00 (GMT+5)
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Карта</h2>
            <div className="mt-3 aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 grid place-items-center text-muted">
              Карта-заглушка
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


