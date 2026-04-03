zikr-app/
│
├── public/
│   └── favicon.ico
│
├── src/
│   │
│   ├── assets/                     # static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       └── main.css
│   │
│   ├── components/                 # global reusable components
│   │   ├── ui/
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseInput.vue
│   │   │   └── BaseLoader.vue
│   │   │
│   │   ├── layout/
│   │   │   ├── AppNavbar.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppFooter.vue
│   │   │
│   │   └── shared/
│   │       ├── EmptyState.vue
│   │       ├── ErrorMessage.vue
│   │       └── ConfirmModal.vue
│   │
│   ├── layouts/                    # layouts
│   │   └── MainLayout.vue
│   │
│   ├── router/
│   │   ├── index.ts
│   │   └── routes.ts
│   │
│   ├── services/                   # global API setup
│   │   ├── axios.ts
│   │   └── endpoints.ts
│   │
│   ├── stores/                     # global stores (Pinia)
│   │   ├── app.store.ts
│   │   ├── settings.store.ts
│   │   └── user.store.ts
│   │
│   ├── composables/                # global composables
│   │   ├── useFetch.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDarkMode.ts
│   │   └── useRTL.ts
│   │
│   ├── utils/                      # helper functions
│   │   ├── formatDate.ts
│   │   ├── formatTime.ts
│   │   ├── debounce.ts
│   │   └── helpers.ts
│   │
│   ├── i18n/                       # translations
│   │   ├── ar.json
│   │   ├── en.json
│   │   └── index.ts
│   │
│   ├── modules/                    # 🔥 FEATURE-BASED MODULES
│   │
│   │   ├── azkar/
│   │   │   ├── components/
│   │   │   │   ├── AzkarCard.vue
│   │   │   │   └── AzkarList.vue
│   │   │   │
│   │   │   ├── views/
│   │   │   │   └── AzkarView.vue
│   │   │   │
│   │   │   ├── composables/
│   │   │   │   ├── useAzkar.ts
│   │   │   │   └── useAzkarCounter.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── azkar.service.ts
│   │   │   │
│   │   │   ├── mutations/
│   │   │   │   └── azkar.mutations.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   └── azkar.types.ts
│   │   │   │
│   │   │   ├── constants/
│   │   │   │   └── azkar.constants.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── hadith/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── composables/
│   │   │   ├── services/
│   │   │   ├── mutations/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   ├── duas/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── composables/
│   │   │   ├── services/
│   │   │   ├── mutations/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   ├── prayer-times/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── composables/
│   │   │   ├── services/
│   │   │   ├── mutations/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   ├── quran/
│   │   │   ├── components/
│   │   │   │   ├── SurahCard.vue
│   │   │   │   ├── AyahItem.vue
│   │   │   │   └── AudioPlayer.vue
│   │   │   │
│   │   │   ├── views/
│   │   │   │   ├── QuranView.vue
│   │   │   │   └── SurahView.vue
│   │   │   │
│   │   │   ├── composables/
│   │   │   │   ├── useQuran.ts
│   │   │   │   └── useAudioPlayer.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── quran.service.ts
│   │   │   │
│   │   │   ├── mutations/
│   │   │   │   └── quran.mutations.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   └── quran.types.ts
│   │   │   │
│   │   │   ├── constants/
│   │   │   │   └── quran.constants.ts
│   │   │   │
│   │   │   └── index.ts
│   │
│   ├── App.vue
│   └── main.ts
│
├── .env
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts