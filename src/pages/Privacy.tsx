export default function PrivacyPage() {
  return (
    <section className="container-balanced mt-10">
      <div className="card p-6 grid gap-4">
        <h1 className="text-2xl font-semibold">Политика конфиденциальности</h1>
        <p className="text-muted">Дата обновления: 30.10.2025</p>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">1. Общие положения</h2>
          <p className="text-muted">Мы уважаем вашу приватность и обрабатываем персональные данные в целях предоставления результатов тестирования и улучшения сервиса.</p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">2. Какие данные мы собираем</h2>
          <ul className="list-disc list-inside text-muted">
            <li>Имя, возраст, пол, email (указываются перед началом теста).</li>
            <li>Ответы на вопросы теста и итоговые результаты.</li>
            <li>Технические данные: cookies, IP-адрес, данные об устройстве (для аналитики).</li>
          </ul>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">3. Цели обработки</h2>
          <p className="text-muted">Формирование результатов, персонализированные рекомендации, связь по email, улучшение качества сервиса.</p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">4. Хранение и защита</h2>
          <p className="text-muted">Мы применяем организационные и технические меры защиты. Данные хранятся ограниченный срок, необходимый для целей обработки.</p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">5. Права субъекта</h2>
          <p className="text-muted">Вы можете запросить доступ, исправление или удаление данных, а также отозвать согласие на обработку, связавшись с нами.</p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-semibold">6. Контакты</h2>
          <p className="text-muted">Для вопросов по обработке данных напишите на privacy@profitest.example</p>
        </div>
      </div>
    </section>
  );
}


