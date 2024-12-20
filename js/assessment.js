const DigitalMaturityAssessment = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [radarData, setRadarData] = React.useState([]);

  const questions = [
    {
      id: 1,
      space: "digital_asset",
      question: "Насколько данные централизованы и стандартизированы в вашей организации?",
      options: [
        "Данные фрагментированы, отсутствуют единые стандарты",
        "Частично стандартизированы, но часто дублируются или устаревают",
        "Большинство данных централизованы и соответствуют стандартам",
        "Данные полностью централизованы, есть единый источник правды",
        "Полностью интегрированная система данных с высокой стандартизацией"
      ]
    },
    {
      id: 2,
      space: "digital_asset",
      question: "Используются ли в организации прогнозная (ML/AI) и предписательная аналитика?",
      options: [
        "Аналитика отсутствует или используется на минимальном уровне",
        "Есть базовая описательная аналитика (BI, отчёты)",
        "Используются простые прогнозные модели для отдельных задач",
        "Прогнозная аналитика активно используется в ключевых процессах",
        "Предписательная аналитика встроена в бизнес-процессы и принятие решений"
      ]
    },
    {
      id: 3,
      space: "processes",
      question: "Насколько ваш процесс разработки цифровых продуктов соответствует Agile/DevOps принципам?",
      options: [
        "Процессы отсутствуют или неформализованы",
        "Частичное использование Agile или DevOps, без полной интеграции",
        "Agile используется для большинства продуктов, есть базовые DevOps-практики",
        "Полная интеграция Agile и DevOps в команды разработки",
        "Непрерывное улучшение процессов, использование CI/CD на высоком уровне"
      ]
    },
    {
      id: 4,
      space: "processes",
      question: "Как формализованы и автоматизированы процессы обработки данных?",
      options: [
        "Процессы выполняются вручную, без автоматизации",
        "Частичная автоматизация, но многое зависит от ручной работы",
        "Большинство процессов автоматизировано, данные интегрированы в ключевые системы",
        "Высокая степень автоматизации, данные поступают в режиме реального времени",
        "Полностью автоматизированные процессы с использованием AI для контроля качества данных"
      ]
    },
    {
      id: 5,
      space: "culture",
      question: "Как часто руководители и сотрудники используют данные и метрики для принятия решений?",
      options: [
        "Решения принимаются исключительно на основе интуиции",
        "Данные используются только в редких случаях и для отчётности",
        "Данные применяются для большинства стратегических решений",
        "Данные активно используются на всех уровнях организации",
        "Решения принимаются только на основе данных и аналитики, есть доверие к данным"
      ]
    },
    {
      id: 6,
      space: "culture",
      question: "Насколько распространена практика A/B-тестирования и пилотных запусков?",
      options: [
        "Эксперименты отсутствуют",
        "Эксперименты проводятся редко и без формализованных методов",
        "A/B-тесты применяются для отдельных продуктов",
        "Эксперименты активно внедряются на уровне команд и процессов",
        "Эксперименты и пилоты являются частью корпоративной культуры"
      ]
    },
    {
      id: 7,
      space: "less_money",
      question: "Насколько успешно ваша организация снижает издержки с помощью цифровых решений?",
      options: [
        "Цифровые решения не применяются для снижения издержек",
        "Сокращение издержек достигается в отдельных проектах, до 5%",
        "Системное снижение издержек на 10-20%",
        "Издержки сокращены на 20-35% с помощью цифровых технологий",
        "Издержки сокращены более чем на 50% благодаря автоматизации и аналитике"
      ]
    },
    {
      id: 8,
      space: "more_money",
      question: "Используются ли цифровые инструменты для роста выручки?",
      options: [
        "Цифровые инструменты не применяются для увеличения доходов",
        "Доходы выросли на 5-10% благодаря отдельным проектам",
        "Доходы стабильно растут на 10-20% с помощью цифровых решений",
        "Выручка увеличилась на 20-50% благодаря интегрированным цифровым инструментам",
        "Рост выручки превысил 50%, сформирована цифровая экосистема"
      ]
    },
    {
      id: 9,
      space: "new_money",
      question: "Разрабатываются ли новые бизнес-модели и продукты на основе цифровых технологий?",
      options: [
        "Новые бизнес-модели не разрабатываются",
        "Инициативы по новым продуктам находятся на начальной стадии",
        "Пилотные проекты для новых моделей дохода уже тестируются",
        "Новые продукты и модели дохода масштабируются",
        "Цифровые решения формируют полноценные новые экосистемы дохода"
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value
    });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const calcAverage = (values) => {
      return values.reduce((a, b) => a + b, 0) / values.length;
    };

    const digitalAssetValues = [answers[1], answers[2]];
    const processesValues = [answers[3], answers[4]];
    const cultureValues = [answers[5], answers[6]];

    const transformedData = [
      {
        subject: 'Цифровой актив',
        'Less Money': calcAverage(digitalAssetValues),
        'More Money': calcAverage(digitalAssetValues),
        'New Money': calcAverage(digitalAssetValues),
      },
      {
        subject: 'Процессы',
        'Less Money': calcAverage(processesValues),
        'More Money': calcAverage(processesValues),
        'New Money': calcAverage(processesValues),
      },
      {
        subject: 'Культура',
        'Less Money': calcAverage(cultureValues),
        'More Money': calcAverage(cultureValues),
        'New Money': calcAverage(cultureValues),
      },
      {
        subject: 'Бизнес-эффект',
        'Less Money': answers[7],
        'More Money': answers[8],
        'New Money': answers[9],
      },
    ];

    setRadarData(transformedData);
    setShowResults(true);
  };

  const ResultsView = () => (
    <div className="space-y-8">
      <div className="flex justify-center">
        <RadarChart width={500} height={400} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar name="Less Money" dataKey="Less Money" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="More Money" dataKey="More Money" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Radar name="New Money" dataKey="New Money" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </div>
      <div className="text-center">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            setCurrentStep(0);
            setAnswers({});
            setShowResults(false);
            setRadarData([]);
          }}
        >
          Начать заново
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {!showResults ? (
        <div className="space-y-6">
          <div className="text-xl font-medium">
            {questions[currentStep].question}
          </div>
          <div className="space-y-4">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                className="w-full p-4 text-left border rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => handleAnswer(index + 1)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500 text-center">
            Вопрос {currentStep + 1} из {questions.length}
          </div>
        </div>
      ) : (
        <ResultsView />
      )}
    </div>
  );
};

window.DigitalMaturityAssessment = DigitalMaturityAssessment;
```

После того, как убедитесь, что этот код на месте, приступим к проверке index.html. Готовы продолжить?
