export default function TermsPage() {
  return (
    <section className="container-balanced mt-10">
      <div className="card p-6 grid gap-4">
        <h1 className="text-2xl font-semibold">Пользовательское соглашение</h1>
        <p className="text-muted">Дата обновления: 30.10.2025</p>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">1. Предмет</h2>
          <p className="text-muted">Сервис предоставляет тестирование по профориентации и рекомендации. Используя сайт, вы соглашаетесь с условиями.</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">2. Регистрация и данные</h2>
          <p className="text-muted">Для формирования результатов требуется указать email. Вы подтверждаете корректность данных.</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">3. Ограничение ответственности</h2>
          <p className="text-muted">Результаты носят рекомендательный характер и не являются гарантией трудоустройства или поступления.</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">4. Платные услуги</h2>
          <p className="text-muted">Расширенный отчёт предоставляется на платной основе. Условия оплаты и возврата описываются при оформлении.</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">5. Интеллектуальная собственность</h2>
          <p className="text-muted">Материалы сайта защищены. Копирование и распространение без согласия запрещены.</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">6. Контакты</h2>
          <p className="text-muted">Для связи: legal@profitest.example</p>
        </div>
      </div>
    </section>
  );
}


