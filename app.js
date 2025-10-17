// Prayer Times Application
const App = {
    // State
    prayerData: null,
    countdownInterval: null,
    nextPrayer: null,
    currentLang: 'en',
    locationMode: 'auto', // 'auto' or 'manual'
    savedLocation: null,
    calculationMethod: 2, // Default: ISNA (2), Jafari (0)
    school: 1, // Default: Hanafi (1), Shafi (0)
    dateConverterInitialized: false,
    showOptionalPrayers: false, // Toggle for optional prayer times

    // Method names mapping (for display)
    methodNames: {
        0: 'Jafari / Shia Ithna-Ashari ',
        1: 'University of Islamic Sciences, Karachi ',
        2: 'Islamic Society of North America - ISNA',
        3: 'Muslim World League',
        4: 'Umm Al-Qura University, Makkah ',
        5: 'Egyptian General Authority of Survey ',
        7: 'Institute of Geophysics, University of Tehran ',
        8: 'Gulf Region',
        11: 'Singapore',
        12: 'France',
        13: 'Turkey'
    },

    schoolNames: {
        0: 'Shafi',
        1: 'Hanafi'
    },

    // Prayer configurations
    prayers: [
        { name: 'Imsak', icon: '🌌', color: '#4a5568', optional: true },
        { name: 'Fajr', icon: '🌅', color: '#667eea' },
        { name: 'Sunrise', icon: '☀️', color: '#f6d365', skipInCountdown: true },
        { name: 'Dhuhr', icon: '🌞', color: '#f093fb' },
        { name: 'Asr', icon: '🌤️', color: '#4facfe' },
        { name: 'Maghrib', icon: '🌆', color: '#fa709a' },
        { name: 'Isha', icon: '🌙', color: '#764ba2' },
        { name: 'Midnight', icon: '🌃', color: '#2d3748', optional: true },
        { name: 'Lastthird', icon: '✨', color: '#5a67d8', optional: true, label: 'Tahajjud Time' }
    ],

    // Translations
    translations: {
        en: {
            timeUntil: 'Time until',
            prayerTimesLabel: 'Prayer times',
            todaysPrayerTimes: "Today's Prayer Times",
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds',
            detectingLocation: 'Detecting your location...',
            unableToLoad: 'Unable to load prayer times',
            tryAgain: 'Try Again',
            dataProvidedBy: 'Data provided by',
            changeLocation: 'Change',
            updateLocationBtn: 'Update',
            changeLocationTitle: 'Change Location',
            changeLocationDesc: 'Enter your city name and country to get accurate prayer times.',
            cityLabel: 'City Name',
            countryLabel: 'Country',
            cityPlaceholder: 'e.g., Karachi',
            countryPlaceholder: 'e.g., Pakistan',
            cancel: 'Cancel',
            updateLocation: 'Update Location',
            findNearbyMosque: 'Find Nearby Mosque',
            showOptionalTimes: 'Show Optional Times',
            calculationMethod: 'Method',
            method_mwl: 'Muslim World League',
            method_isna: 'ISNA (North America)',
            method_ummalqura: 'Umm Al-Qura (Makkah)',
            method_egyptian: 'Egyptian',
            method_karachi: 'University of Karachi',
            method_jafari: 'Jafari (Shia)',
            method_tehran: 'Tehran',
            method_gulf: 'Gulf Region',
            method_turkey: 'Turkey',
            method_singapore: 'Singapore',
            method_france: 'France (UOIF)',
            settings: 'Settings',
            calculationMethod: 'Calculation Method',
            calculationMethodDesc: 'Choose the method for prayer time calculations',
            asrCalculation: 'Asr Calculation Method',
            asrCalculationDesc: 'Choose the juristic method for Asr prayer time',
            schoolShafi: 'Shafi, Maliki, Hanbali',
            schoolHanafi: 'Hanafi',
            basedOn: 'Based on:',
            change: 'change',
            prayers: {
                Imsak: 'Imsak',
                Fajr: 'Fajr',
                Sunrise: 'Sunrise',
                Dhuhr: 'Dhuhr',
                Asr: 'Asr',
                Maghrib: 'Maghrib',
                Isha: 'Isha',
                Midnight: 'Midnight',
                Lastthird: 'Tahajjud Time'
            }
        },
        ur: {
            timeUntil: 'نماز تک وقت',
            prayerTimesLabel: 'نماز کے اوقات',
            todaysPrayerTimes: 'آج کی نماز کے اوقات',
            hours: 'گھنٹے',
            minutes: 'منٹ',
            seconds: 'سیکنڈ',
            detectingLocation: 'آپ کا مقام تلاش کیا جا رہا ہے...',
            unableToLoad: 'نماز کے اوقات لوڈ نہیں ہو سکے',
            tryAgain: 'دوبارہ کوشش کریں',
            dataProvidedBy: 'ڈیٹا فراہم کردہ',
            changeLocation: 'تبدیل کریں',
            updateLocationBtn: 'اپ ڈیٹ',
            changeLocationTitle: 'مقام تبدیل کریں',
            changeLocationDesc: 'درست نماز کے اوقات کے لیے اپنے شہر اور ملک کا نام درج کریں۔',
            cityLabel: 'شہر کا نام',
            countryLabel: 'ملک',
            cityPlaceholder: 'مثلاً، کراچی',
            countryPlaceholder: 'مثلاً، پاکستان',
            cancel: 'منسوخ',
            updateLocation: 'مقام اپ ڈیٹ کریں',
            findNearbyMosque: 'قریبی مسجد تلاش کریں',
            showOptionalTimes: 'اختیاری اوقات دکھائیں',
            calculationMethod: 'طریقہ',
            method_mwl: 'مسلم ورلڈ لیگ',
            method_isna: 'اسلامک سوسائٹی (امریکہ)',
            method_ummalqura: 'ام القریٰ (مکہ)',
            method_egyptian: 'مصری',
            method_karachi: 'یونیورسٹی آف کراچی',
            method_jafari: 'جعفری (شیعہ)',
            method_tehran: 'تہران',
            method_gulf: 'خلیجی خطہ',
            method_turkey: 'ترکی',
            method_singapore: 'سنگاپور',
            method_france: 'فرانس',
            settings: 'ترتیبات',
            calculationMethod: 'حساب کا طریقہ',
            calculationMethodDesc: 'نماز کے اوقات کے حساب کے لیے طریقہ منتخب کریں',
            asrCalculation: 'عصر کا حساب',
            asrCalculationDesc: 'عصر کی نماز کے لیے فقہی طریقہ منتخب کریں',
            schoolShafi: 'شافعی، مالکی، حنبلی',
            schoolHanafi: 'حنفی',
            basedOn: 'بنیاد:',
            change: 'تبدیل',
            prayers: {
                Imsak: 'امساک',
                Fajr: 'فجر',
                Sunrise: 'طلوع آفتاب',
                Dhuhr: 'ظہر',
                Asr: 'عصر',
                Maghrib: 'مغرب',
                Isha: 'عشاء',
                Midnight: 'آدھی رات',
                Lastthird: 'تہجد کا وقت'
            }
        },
        ar: {
            timeUntil: 'الوقت المتبقي حتى',
            prayerTimesLabel: 'مواقيت الصلاة',
            todaysPrayerTimes: 'مواقيت الصلاة اليوم',
            hours: 'ساعات',
            minutes: 'دقائق',
            seconds: 'ثواني',
            detectingLocation: 'جاري تحديد موقعك...',
            unableToLoad: 'تعذر تحميل مواقيت الصلاة',
            tryAgain: 'حاول مرة أخرى',
            dataProvidedBy: 'البيانات مقدمة من',
            changeLocation: 'تغيير',
            updateLocationBtn: 'تحديث',
            changeLocationTitle: 'تغيير الموقع',
            changeLocationDesc: 'أدخل اسم مدينتك وبلدك للحصول على أوقات صلاة دقيقة.',
            cityLabel: 'اسم المدينة',
            countryLabel: 'البلد',
            cityPlaceholder: 'مثال، الرياض',
            countryPlaceholder: 'مثال، السعودية',
            cancel: 'إلغاء',
            updateLocation: 'تحديث الموقع',
            findNearbyMosque: 'ابحث عن مسجد قريب',
            showOptionalTimes: 'إظهار الأوقات الاختيارية',
            calculationMethod: 'الطريقة',
            method_mwl: 'رابطة العالم الإسلامي',
            method_isna: 'الجمعية الإسلامية (أمريكا)',
            method_ummalqura: 'أم القرى (مكة)',
            method_egyptian: 'المصرية',
            method_karachi: 'جامعة كراتشي',
            method_jafari: 'الجعفري (شيعة)',
            method_tehran: 'طهران',
            method_gulf: 'منطقة الخليج',
            method_turkey: 'تركيا',
            method_singapore: 'سنغافورة',
            method_france: 'فرنسا',
            settings: 'الإعدادات',
            calculationMethod: 'طريقة الحساب',
            calculationMethodDesc: 'اختر الطريقة لحساب أوقات الصلاة',
            asrCalculation: 'طريقة حساب العصر',
            asrCalculationDesc: 'اختر الطريقة الفقهية لوقت صلاة العصر',
            schoolShafi: 'الشافعي، المالكي، الحنبلي',
            schoolHanafi: 'الحنفي',
            basedOn: 'بناءً على:',
            change: 'تغيير',
            prayers: {
                Imsak: 'الإمساك',
                Fajr: 'الفجر',
                Sunrise: 'الشروق',
                Dhuhr: 'الظهر',
                Asr: 'العصر',
                Maghrib: 'المغرب',
                Isha: 'العشاء',
                Midnight: 'منتصف الليل',
                Lastthird: 'وقت التهجد'
            }
        },
        hi: {
            timeUntil: 'नमाज़ तक समय',
            prayerTimesLabel: 'नमाज़ का समय',
            todaysPrayerTimes: 'आज की नमाज़ का समय',
            hours: 'घंटे',
            minutes: 'मिनट',
            seconds: 'सेकंड',
            detectingLocation: 'आपका स्थान खोजा जा रहा है...',
            unableToLoad: 'नमाज़ का समय लोड नहीं हो सका',
            tryAgain: 'फिर से कोशिश करें',
            dataProvidedBy: 'डेटा प्रदान किया गया',
            changeLocation: 'बदलें',
            updateLocationBtn: 'अपडेट करें',
            changeLocationTitle: 'स्थान बदलें',
            changeLocationDesc: 'सटीक नमाज़ समय के लिए अपने शहर और देश का नाम दर्ज करें।',
            cityLabel: 'शहर का नाम',
            countryLabel: 'देश',
            cityPlaceholder: 'उदा., मुंबई',
            countryPlaceholder: 'उदा., भारत',
            cancel: 'रद्द करें',
            updateLocation: 'स्थान अपडेट करें',
            findNearbyMosque: 'पास की मस्जिद खोजें',
            showOptionalTimes: 'वैकल्पिक समय दिखाएं',
            calculationMethod: 'विधि',
            method_mwl: 'मुस्लिम वर्ल्ड लीग',
            method_isna: 'ISNA (उत्तरी अमेरिका)',
            method_ummalqura: 'उम्म अल-कुरा (मक्का)',
            method_egyptian: 'मिस्री',
            method_karachi: 'यूनिवर्सिटी ऑफ कराची',
            method_jafari: 'जाफ़री (शिया)',
            method_tehran: 'तेहरान',
            method_gulf: 'खाड़ी क्षेत्र',
            method_turkey: 'तुर्की',
            method_singapore: 'सिंगापुर',
            method_france: 'फ्रांस',
            settings: 'सेटिंग्स',
            calculationMethod: 'गणना विधि',
            calculationMethodDesc: 'नमाज़ के समय की गणना के लिए विधि चुनें',
            asrCalculation: 'असर गणना विधि',
            asrCalculationDesc: 'असर नमाज़ के समय के लिए विधि चुनें',
            schoolShafi: 'शफी, मालिकी, हनबली',
            schoolHanafi: 'हनफी',
            basedOn: 'आधारित:',
            change: 'बदलें',
            prayers: {
                Imsak: 'इमसाक',
                Fajr: 'फ़ज्र',
                Sunrise: 'सूर्योदय',
                Dhuhr: 'ज़ुहर',
                Asr: 'अस्र',
                Maghrib: 'मग़रिब',
                Isha: 'इशा',
                Midnight: 'मध्यरात्रि',
                Lastthird: 'तहज्जुद का समय'
            }
        },
        tr: {
            timeUntil: 'Kalan süre',
            prayerTimesLabel: 'Namaz Vakitleri',
            todaysPrayerTimes: "Bugünün Namaz Vakitleri",
            hours: 'saat',
            minutes: 'dakika',
            seconds: 'saniye',
            detectingLocation: 'Konumunuz tespit ediliyor...',
            unableToLoad: 'Namaz vakitleri yüklenemedi',
            tryAgain: 'Tekrar Dene',
            dataProvidedBy: 'Veri sağlayıcı',
            changeLocation: 'Değiştir',
            updateLocationBtn: 'Güncelle',
            changeLocationTitle: 'Konumu Değiştir',
            changeLocationDesc: 'Doğru namaz vakitleri için şehir ve ülke adınızı girin.',
            cityLabel: 'Şehir Adı',
            countryLabel: 'Ülke',
            cityPlaceholder: 'örn., İstanbul',
            countryPlaceholder: 'örn., Türkiye',
            cancel: 'İptal',
            updateLocation: 'Konumu Güncelle',
            findNearbyMosque: 'Yakındaki Cami Bul',
            showOptionalTimes: 'İsteğe Bağlı Zamanları Göster',
            calculationMethod: 'Yöntem',
            method_mwl: 'Dünya İslam Birliği',
            method_isna: 'ISNA (Kuzey Amerika)',
            method_ummalqura: 'Ümmü\'l-Kura (Mekke)',
            method_egyptian: 'Mısır',
            method_karachi: 'Karaçi Üniversitesi',
            method_jafari: 'Caferi (Şii)',
            method_tehran: 'Tahran',
            method_gulf: 'Körfez Bölgesi',
            method_turkey: 'Türkiye Diyanet',
            method_singapore: 'Singapur',
            method_france: 'Fransa',
            settings: 'Ayarlar',
            calculationMethod: 'Hesaplama Yöntemi',
            calculationMethodDesc: 'Namaz vakitleri hesaplama yöntemini seçin',
            asrCalculation: 'İkindi Hesaplama',
            asrCalculationDesc: 'İkindi namazı için fıkhi yöntemi seçin',
            schoolShafi: 'Şafii, Maliki, Hanbeli',
            schoolHanafi: 'Hanefi',
            basedOn: 'Temel:',
            change: 'değiştir',
            prayers: {
                Imsak: 'İmsak',
                Fajr: 'Sabah',
                Sunrise: 'Güneş',
                Dhuhr: 'Öğle',
                Asr: 'İkindi',
                Maghrib: 'Akşam',
                Isha: 'Yatsı',
                Midnight: 'Gece Yarısı',
                Lastthird: 'Teheccüd Vakti'
            }
        },
        id: {
            timeUntil: 'Waktu tersisa',
            prayerTimesLabel: 'Waktu Shalat',
            todaysPrayerTimes: 'Waktu Shalat Hari Ini',
            hours: 'jam',
            minutes: 'menit',
            seconds: 'detik',
            detectingLocation: 'Mendeteksi lokasi Anda...',
            unableToLoad: 'Tidak dapat memuat waktu shalat',
            tryAgain: 'Coba Lagi',
            dataProvidedBy: 'Data disediakan oleh',
            changeLocation: 'Ubah',
            updateLocationBtn: 'Perbarui',
            changeLocationTitle: 'Ubah Lokasi',
            changeLocationDesc: 'Masukkan nama kota dan negara untuk mendapatkan waktu shalat yang akurat.',
            cityLabel: 'Nama Kota',
            countryLabel: 'Negara',
            cityPlaceholder: 'contoh, Jakarta',
            countryPlaceholder: 'contoh, Indonesia',
            cancel: 'Batal',
            updateLocation: 'Perbarui Lokasi',
            findNearbyMosque: 'Cari Masjid Terdekat',
            showOptionalTimes: 'Tampilkan Waktu Opsional',
            calculationMethod: 'Metode',
            method_mwl: 'Muslim World League',
            method_isna: 'ISNA (Amerika Utara)',
            method_ummalqura: 'Umm Al-Qura (Mekkah)',
            method_egyptian: 'Mesir',
            method_karachi: 'Universitas Karachi',
            method_jafari: 'Jafari (Syiah)',
            method_tehran: 'Teheran',
            method_gulf: 'Wilayah Teluk',
            method_turkey: 'Turki',
            method_singapore: 'Singapura',
            method_france: 'Prancis',
            settings: 'Pengaturan',
            calculationMethod: 'Metode Perhitungan',
            calculationMethodDesc: 'Pilih metode untuk perhitungan waktu shalat',
            asrCalculation: 'Metode Ashar',
            asrCalculationDesc: 'Pilih metode fikih untuk waktu shalat Ashar',
            schoolShafi: 'Syafi\'i, Maliki, Hanbali',
            schoolHanafi: 'Hanafi',
            basedOn: 'Berdasarkan:',
            change: 'ubah',
            prayers: {
                Imsak: 'Imsak',
                Fajr: 'Subuh',
                Sunrise: 'Terbit',
                Dhuhr: 'Dzuhur',
                Asr: 'Ashar',
                Maghrib: 'Maghrib',
                Isha: 'Isya',
                Midnight: 'Tengah Malam',
                Lastthird: 'Waktu Tahajud'
            }
        },
        fa: {
            timeUntil: 'زمان باقی‌مانده تا',
            prayerTimesLabel: 'اوقات نماز',
            todaysPrayerTimes: 'اوقات نماز امروز',
            hours: 'ساعت',
            minutes: 'دقیقه',
            seconds: 'ثانیه',
            detectingLocation: 'در حال تشخیص موقعیت شما...',
            unableToLoad: 'بارگذاری اوقات نماز ممکن نیست',
            tryAgain: 'تلاش مجدد',
            dataProvidedBy: 'داده‌ها ارائه شده توسط',
            changeLocation: 'تغییر',
            updateLocationBtn: 'به‌روزرسانی',
            changeLocationTitle: 'تغییر موقعیت',
            changeLocationDesc: 'نام شهر و کشور خود را برای دریافت اوقات نماز دقیق وارد کنید.',
            cityLabel: 'نام شهر',
            countryLabel: 'کشور',
            cityPlaceholder: 'مثال، تهران',
            countryPlaceholder: 'مثال، ایران',
            cancel: 'لغو',
            updateLocation: 'به‌روزرسانی موقعیت',
            findNearbyMosque: 'یافتن مسجد نزدیک',
            showOptionalTimes: 'نمایش اوقات اختیاری',
            calculationMethod: 'روش',
            method_mwl: 'اتحادیه جهانی مسلمانان',
            method_isna: 'ISNA (آمریکای شمالی)',
            method_ummalqura: 'ام‌القرای (مکه)',
            method_egyptian: 'مصری',
            method_karachi: 'دانشگاه کراچی',
            method_jafari: 'جعفری (شیعه)',
            method_tehran: 'تهران',
            method_gulf: 'منطقه خلیج',
            method_turkey: 'ترکیه',
            method_singapore: 'سنگاپور',
            method_france: 'فرانسه',
            settings: 'تنظیمات',
            calculationMethod: 'روش محاسبه',
            calculationMethodDesc: 'روش محاسبه اوقات نماز را انتخاب کنید',
            asrCalculation: 'روش محاسبه عصر',
            asrCalculationDesc: 'روش فقهی برای نماز عصر را انتخاب کنید',
            schoolShafi: 'شافعی، مالکی، حنبلی',
            schoolHanafi: 'حنفی',
            basedOn: 'بر اساس:',
            change: 'تغییر',
            prayers: {
                Imsak: 'امساک',
                Fajr: 'صبح',
                Sunrise: 'طلوع آفتاب',
                Dhuhr: 'ظهر',
                Asr: 'عصر',
                Maghrib: 'مغرب',
                Isha: 'عشاء',
                Midnight: 'نیمه شب',
                Lastthird: 'وقت تهجد'
            }
        },
        fr: {
            timeUntil: 'Temps restant',
            prayerTimesLabel: 'Horaires de prière',
            todaysPrayerTimes: "Horaires de Prière d'Aujourd'hui",
            hours: 'heures',
            minutes: 'minutes',
            seconds: 'secondes',
            detectingLocation: 'Détection de votre position...',
            unableToLoad: 'Impossible de charger les horaires de prière',
            tryAgain: 'Réessayer',
            dataProvidedBy: 'Données fournies par',
            changeLocation: 'Modifier',
            updateLocationBtn: 'Actualiser',
            changeLocationTitle: 'Modifier la Position',
            changeLocationDesc: 'Entrez le nom de votre ville et pays pour obtenir des horaires de prière précis.',
            cityLabel: 'Nom de la Ville',
            countryLabel: 'Pays',
            cityPlaceholder: 'ex., Paris',
            countryPlaceholder: 'ex., France',
            cancel: 'Annuler',
            updateLocation: 'Actualiser la Position',
            findNearbyMosque: 'Trouver une Mosquée à Proximité',
            showOptionalTimes: 'Afficher les Horaires Facultatifs',
            calculationMethod: 'Méthode',
            method_mwl: 'Ligue Islamique Mondiale',
            method_isna: 'ISNA (Amérique du Nord)',
            method_ummalqura: 'Umm Al-Qura (La Mecque)',
            method_egyptian: 'Égyptien',
            method_karachi: 'Université de Karachi',
            method_jafari: 'Jafari (Chiite)',
            method_tehran: 'Téhéran',
            method_gulf: 'Région du Golfe',
            method_turkey: 'Turquie',
            method_singapore: 'Singapour',
            method_france: 'France (UOIF)',
            settings: 'Paramètres',
            calculationMethod: 'Méthode de Calcul',
            calculationMethodDesc: 'Choisissez la méthode pour le calcul des heures de prière',
            asrCalculation: 'Méthode Asr',
            asrCalculationDesc: 'Choisissez la méthode juridique pour l\'heure de la prière Asr',
            schoolShafi: 'Chafi\'i, Maliki, Hanbali',
            schoolHanafi: 'Hanafi',
            basedOn: 'Basé sur:',
            change: 'modifier',
            prayers: {
                Imsak: 'Imsak',
                Fajr: 'Fajr',
                Sunrise: 'Lever du Soleil',
                Dhuhr: 'Dhuhr',
                Asr: 'Asr',
                Maghrib: 'Maghrib',
                Isha: 'Isha',
                Midnight: 'Minuit',
                Lastthird: 'Temps de Tahajjud'
            }
        },
        bn: {
            timeUntil: 'বাকি সময়',
            prayerTimesLabel: 'নামাজের সময়',
            todaysPrayerTimes: 'আজকের নামাজের সময়',
            hours: 'ঘণ্টা',
            minutes: 'মিনিট',
            seconds: 'সেকেন্ড',
            detectingLocation: 'আপনার অবস্থান সনাক্ত করা হচ্ছে...',
            unableToLoad: 'নামাজের সময় লোড করা যায়নি',
            tryAgain: 'আবার চেষ্টা করুন',
            dataProvidedBy: 'তথ্য প্রদানকারী',
            changeLocation: 'পরিবর্তন করুন',
            updateLocationBtn: 'হালনাগাদ করুন',
            changeLocationTitle: 'অবস্থান পরিবর্তন করুন',
            changeLocationDesc: 'সঠিক নামাজের সময় পেতে আপনার শহর এবং দেশের নাম লিখুন।',
            cityLabel: 'শহরের নাম',
            countryLabel: 'দেশ',
            cityPlaceholder: 'উদাহরণ, ঢাকা',
            countryPlaceholder: 'উদাহরণ, বাংলাদেশ',
            cancel: 'বাতিল করুন',
            updateLocation: 'অবস্থান হালনাগাদ করুন',
            findNearbyMosque: 'কাছের মসজিদ খুঁজুন',
            showOptionalTimes: 'ঐচ্ছিক সময় দেখান',
            calculationMethod: 'পদ্ধতি',
            method_mwl: 'মুসলিম ওয়ার্ল্ড লীগ',
            method_isna: 'ISNA (উত্তর আমেরিকা)',
            method_ummalqura: 'উম্মুল কুরা (মক্কা)',
            method_egyptian: 'মিশরীয়',
            method_karachi: 'কারাচি বিশ্ববিদ্যালয়',
            method_jafari: 'জাফরি (শিয়া)',
            method_tehran: 'তেহরান',
            method_gulf: 'উপসাগরীয় অঞ্চল',
            method_turkey: 'তুরস্ক',
            method_singapore: 'সিঙ্গাপুর',
            method_france: 'ফ্রান্স',
            settings: 'সেটিংস',
            calculationMethod: 'গণনা পদ্ধতি',
            calculationMethodDesc: 'নামাজের সময় গণনার পদ্ধতি নির্বাচন করুন',
            asrCalculation: 'আসর গণনা পদ্ধতি',
            asrCalculationDesc: 'আসর নামাজের জন্য ফিকহি পদ্ধতি নির্বাচন করুন',
            schoolShafi: 'শাফেয়ী, মালিকী, হাম্বলী',
            schoolHanafi: 'হানাফী',
            basedOn: 'ভিত্তি:',
            change: 'পরিবর্তন',
            prayers: {
                Imsak: 'ইমসাক',
                Fajr: 'ফজর',
                Sunrise: 'সূর্যোদয়',
                Dhuhr: 'যোহর',
                Asr: 'আসর',
                Maghrib: 'মাগরিব',
                Isha: 'এশা',
                Midnight: 'মধ্যরাত্রি',
                Lastthird: 'তাহাজ্জুদের সময়'
            }
        }
    },

    // Initialize app
    init() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.savedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        this.calculationMethod = parseInt(localStorage.getItem('calculationMethod')) || 2;
        this.school = parseInt(localStorage.getItem('school')) || 1; // Default: Hanafi
        this.showOptionalPrayers = localStorage.getItem('showOptionalPrayers') === 'true';
        this.initNavigation();
        this.initLanguage();
        this.initSettings();
        this.initLocationModal();
        this.initCalculationMethod();
        this.initOptionalPrayersToggle();
        this.updateCurrentTime();
        this.showLoading();
        
        // Check if user has saved location preference
        if (this.savedLocation) {
            this.locationMode = 'manual';
            this.fetchPrayerTimesByCity(this.savedLocation.city, this.savedLocation.country);
        } else {
            // Use automatic fallback location (IP/timezone) - don't prompt for GPS
            this.useFallbackLocation();
        }
    },

    // Update current time display
    updateCurrentTime() {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            
            const currentTimeElement = document.getElementById('current-time');
            if (currentTimeElement) {
                currentTimeElement.textContent = timeString;
            }
        };
        
        // Update immediately
        updateTime();
        
        // Update every minute
        setInterval(updateTime, 60000);
    },

    // Initialize language
    initLanguage() {
        const langToggle = document.getElementById('language-toggle');
        const langDropdown = document.getElementById('language-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');
        
        // Toggle dropdown on button click
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
        
        // Set active language option
        langOptions.forEach(option => {
            if (option.dataset.lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
            
            // Add click event
            option.addEventListener('click', () => {
                this.switchLanguage(option.dataset.lang);
                langDropdown.classList.remove('active');
            });
        });
        
        // Set RTL for Arabic and Urdu
        this.updateDirection();
    },

    // Switch language
    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update active option
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });
        
        // Update direction
        this.updateDirection();
        
        // Update all text
        this.updateLanguage();
    },

    // Update text direction for RTL languages
    updateDirection() {
        if (this.currentLang === 'ar' || this.currentLang === 'ur' || this.currentLang === 'fa') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
        }
    },

    // Update all translatable text
    updateLanguage() {
        const t = this.translations[this.currentLang];
        
        // Update static text
        const loadingText = document.querySelector('#loading p');
        if (loadingText) loadingText.textContent = t.detectingLocation;
        
        const errorTitle = document.querySelector('#error h2');
        if (errorTitle) errorTitle.textContent = t.unableToLoad;
        
        const retryBtn = document.querySelector('.retry-btn');
        if (retryBtn) retryBtn.textContent = t.tryAgain;
        
        const nextPrayerLabel = document.querySelector('.next-prayer-label');
        if (nextPrayerLabel) nextPrayerLabel.textContent = t.timeUntil;
        
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = t.todaysPrayerTimes;
        
        const footerText = document.querySelector('.footer p');
        if (footerText) {
            footerText.innerHTML = `${t.dataProvidedBy} <a href="https://aladhan.com" target="_blank">AlAdhan API</a>`;
        }
        
        // Update countdown labels
        document.getElementById('hours')?.nextElementSibling?.textContent && 
            (document.querySelector('.time-label:nth-of-type(1)').textContent = t.hours);
        document.querySelector('.countdown .time-unit:nth-child(2) .time-label').textContent = t.hours;
        document.querySelector('.countdown .time-unit:nth-child(4) .time-label').textContent = t.minutes;
        document.querySelector('.countdown .time-unit:nth-child(6) .time-label').textContent = t.seconds;
        
        // Update modal text
        this.updateModalLanguage();
        
        // Update location buttons
        const changeLocationBtn = document.getElementById('change-location-btn');
        if (changeLocationBtn) changeLocationBtn.textContent = t.changeLocation;
        
        const updateLocationBtn = document.getElementById('update-location-btn');
        if (updateLocationBtn) updateLocationBtn.textContent = t.updateLocationBtn;
        
        // Update mosque link text
        const mosqueLink = document.querySelector('.mosque-link');
        if (mosqueLink) {
            mosqueLink.childNodes[1].textContent = ` ${t.findNearbyMosque}`;
        }
        
        // Update calculation method dropdown
        const methodLabel = document.querySelector('.method-label');
        if (methodLabel) methodLabel.textContent = t.calculationMethod;
        
        const methodDropdown = document.getElementById('calculation-method');
        if (methodDropdown) {
            const options = methodDropdown.querySelectorAll('option');
            options.forEach(option => {
                const key = option.getAttribute('data-i18n-option');
                if (key && t[key]) {
                    option.textContent = t[key];
                }
            });
        }
        
        // Update optional prayers toggle label
        const optionalToggleLabel = document.querySelector('.optional-toggle-label');
        if (optionalToggleLabel) optionalToggleLabel.textContent = t.showOptionalTimes;
        
        // Update settings modal
        const settingsTitle = document.querySelector('.settings-title');
        if (settingsTitle) settingsTitle.textContent = t.settings;
        
        const settingLabels = document.querySelectorAll('.setting-label');
        if (settingLabels[0]) settingLabels[0].textContent = t.calculationMethod;
        if (settingLabels[1]) settingLabels[1].textContent = t.asrCalculation;
        
        const settingDescs = document.querySelectorAll('.setting-description');
        if (settingDescs[0]) settingDescs[0].textContent = t.calculationMethodDesc;
        if (settingDescs[1]) settingDescs[1].textContent = t.asrCalculationDesc;
        
        const schoolNames = document.querySelectorAll('.radio-name');
        if (schoolNames[0]) schoolNames[0].textContent = t.schoolShafi;
        if (schoolNames[1]) schoolNames[1].textContent = t.schoolHanafi;
        
        // Redisplay prayer times if loaded
        if (this.prayerData) {
            this.displayPrayerTimes();
        }
    },

    // Initialize navigation
    initNavigation() {
        // Mobile drawer navigation
        const navToggle = document.getElementById('nav-toggle');
        const navDrawer = document.getElementById('nav-drawer');
        const navClose = document.getElementById('nav-close');
        const navOverlay = document.getElementById('nav-overlay');
        const mobileNavLinks = document.querySelectorAll('.nav-link');
        
        // Desktop header navigation
        const headerLinks = document.querySelectorAll('.header-link');

        // Open navigation drawer (mobile)
        const openNav = () => {
            if (navDrawer) {
                navDrawer.classList.add('open');
                navOverlay.classList.add('visible');
                document.body.style.overflow = 'hidden';
            }
        };

        // Close navigation drawer (mobile)
        const closeNav = () => {
            if (navDrawer) {
                navDrawer.classList.remove('open');
                navOverlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        };

        // Handle page navigation
        const navigateToPage = (page) => {
            // Update active state for mobile nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset.page === page) {
                    link.closest('.nav-item')?.classList.add('active');
                }
            });
            
            // Update active state for desktop header
            document.querySelectorAll('.header-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === page) {
                    link.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            closeNav();
            
            // Switch pages
            App.switchPage(page);
        };

        // Mobile drawer event listeners
        if (navToggle) navToggle.addEventListener('click', openNav);
        if (navClose) navClose.addEventListener('click', closeNav);
        if (navOverlay) navOverlay.addEventListener('click', closeNav);

        // Mobile navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(link.dataset.page);
            });
        });

        // Desktop header navigation links
        headerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(link.dataset.page);
            });
        });
    },


    // Initialize settings modal
    initSettings() {
        const settingsToggle = document.getElementById('settings-toggle');
        const settingsModal = document.getElementById('settings-modal');
        const settingsOverlay = document.getElementById('settings-overlay');
        const settingsClose = document.getElementById('settings-close');
        const schoolRadios = document.querySelectorAll('input[name="school"]');

        // Set initial radio button state
        schoolRadios.forEach(radio => {
            if (parseInt(radio.value) === this.school) {
                radio.checked = true;
            }

            // Add change event listener
            radio.addEventListener('change', () => {
                const newSchool = parseInt(radio.value);
                if (newSchool !== this.school) {
                    this.switchSchool(newSchool);
                }
            });
        });

        // Open settings modal
        const openSettings = (e) => {
            e.preventDefault();
            e.stopPropagation();
            settingsModal.classList.add('active');
            settingsOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        if (settingsToggle) {
            settingsToggle.addEventListener('click', openSettings);
        }

        // Settings change link handler
        const settingsChangeLink = document.getElementById('settings-change-link');
        if (settingsChangeLink) {
            settingsChangeLink.addEventListener('click', openSettings);
        }

        // Close settings modal
        const closeSettings = () => {
            settingsModal.classList.remove('active');
            settingsOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (settingsClose) {
            settingsClose.addEventListener('click', closeSettings);
        }

        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', closeSettings);
        }
    },

    // Switch school (Asr calculation method)
    switchSchool(school) {
        if (this.school === school) return;
        
        this.school = school;
        localStorage.setItem('school', school);
        
        // Update settings indicator
        this.updateSettingsIndicator();
        
        // Stop the current countdown
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        
        // Store location data
        const latitude = this.prayerData?.meta?.latitude;
        const longitude = this.prayerData?.meta?.longitude;
        
        // Reload prayer times with new school
        this.showLoading();
        if (this.locationMode === 'manual' && this.savedLocation) {
            this.fetchPrayerTimesByCity(this.savedLocation.city, this.savedLocation.country);
        } else if (latitude && longitude) {
            this.fetchPrayerTimes(latitude, longitude);
        }
    },

    // Update settings indicator
    updateSettingsIndicator() {
        const currentMethod = document.getElementById('current-method');
        const currentSchool = document.getElementById('current-school');
        
        if (currentMethod) {
            currentMethod.textContent = this.methodNames[this.calculationMethod] || 'ISNA';
        }
        if (currentSchool) {
            currentSchool.textContent = this.schoolNames[this.school] || 'Hanafi';
        }
    },

    // Initialize calculation method
    initCalculationMethod() {
        const methodDropdown = document.getElementById('calculation-method');
        
        // Set selected option based on saved method
        methodDropdown.value = this.calculationMethod;
        
        // Add change event
        methodDropdown.addEventListener('change', (e) => {
            const method = parseInt(e.target.value);
            this.switchCalculationMethod(method);
        });
    },

    // Switch calculation method
    switchCalculationMethod(method) {
        if (this.calculationMethod === method) return;
        
        this.calculationMethod = method;
        localStorage.setItem('calculationMethod', method);
        
        // Update dropdown value
        const methodDropdown = document.getElementById('calculation-method');
        methodDropdown.value = method;
        
        // Update settings indicator
        this.updateSettingsIndicator();
        
        // Stop the current countdown to prevent showing incorrect times
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        
        // Store location data before clearing
        const latitude = this.prayerData?.meta?.latitude;
        const longitude = this.prayerData?.meta?.longitude;
        
        // DON'T clear prayerData - just update the method and refetch
        // This preserves location info until new data arrives
        
        // Reload prayer times with new method
        this.showLoading();
        if (this.locationMode === 'manual' && this.savedLocation) {
            this.fetchPrayerTimesByCity(this.savedLocation.city, this.savedLocation.country);
        } else if (latitude && longitude) {
            // Use stored coordinates
            this.fetchPrayerTimes(latitude, longitude);
        }
    },

    // Initialize location modal
    initLocationModal() {
        const changeLocationBtn = document.getElementById('change-location-btn');
        const updateLocationBtn = document.getElementById('update-location-btn');
        const cancelBtn = document.getElementById('cancel-location-btn');
        const submitBtn = document.getElementById('submit-location-btn');
        const modal = document.getElementById('location-modal');
        const cityInput = document.getElementById('city-input');
        const countryInput = document.getElementById('country-input');

        // Open modal
        if (changeLocationBtn) {
            changeLocationBtn.addEventListener('click', () => {
                this.openLocationModal();
            });
        }

        // Update to current GPS location
        if (updateLocationBtn) {
            updateLocationBtn.addEventListener('click', () => {
                this.updateToCurrentLocation();
            });
        }

        // Close modal
        cancelBtn.addEventListener('click', () => {
            this.closeLocationModal();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeLocationModal();
            }
        });

        // Submit location
        submitBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            const country = countryInput.value.trim();

            if (city && country) {
                this.saveAndUpdateLocation(city, country);
            }
        });

        // Submit on Enter key
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                const country = countryInput.value.trim();
                if (city && country) {
                    this.saveAndUpdateLocation(city, country);
                }
            }
        };

        cityInput.addEventListener('keypress', handleEnter);
        countryInput.addEventListener('keypress', handleEnter);

        // Update modal text
        this.updateModalLanguage();
    },

    // Open location modal
    openLocationModal() {
        const modal = document.getElementById('location-modal');
        const cityInput = document.getElementById('city-input');
        const countryInput = document.getElementById('country-input');
        
        // Pre-fill with saved location if available
        if (this.savedLocation) {
            cityInput.value = this.savedLocation.city;
            countryInput.value = this.savedLocation.country;
        }
        
        modal.classList.remove('hidden');
        cityInput.focus();
    },

    // Close location modal
    closeLocationModal() {
        const modal = document.getElementById('location-modal');
        modal.classList.add('hidden');
    },

    // Update modal language
    updateModalLanguage() {
        const t = this.translations[this.currentLang];
        
        document.querySelector('.location-modal h3').textContent = t.changeLocationTitle;
        document.querySelector('.location-modal p').textContent = t.changeLocationDesc;
        document.querySelector('label[for="city-input"]').textContent = t.cityLabel;
        document.querySelector('label[for="country-input"]').textContent = t.countryLabel;
        document.getElementById('city-input').placeholder = t.cityPlaceholder;
        document.getElementById('country-input').placeholder = t.countryPlaceholder;
        document.getElementById('cancel-location-btn').textContent = t.cancel;
        document.getElementById('submit-location-btn').textContent = t.updateLocation;
    },

    // Save and update location
    saveAndUpdateLocation(city, country) {
        this.savedLocation = { city, country };
        this.locationMode = 'manual';
        localStorage.setItem('savedLocation', JSON.stringify(this.savedLocation));
        
        this.closeLocationModal();
        this.showLoading();
        this.fetchPrayerTimesByCity(city, country);
    },

    // Update to current GPS location
    updateToCurrentLocation() {
        // Clear saved location
        this.savedLocation = null;
        this.locationMode = 'auto';
        localStorage.removeItem('savedLocation');
        
        // Show loading and get precise GPS location
        this.showLoading();
        this.getUserLocation(true); // Pass true to indicate user-initiated request
    },

    // Initialize optional prayers toggle
    initOptionalPrayersToggle() {
        const checkbox = document.getElementById('optional-prayers-toggle');
        
        if (!checkbox) return;
        
        // Set initial state
        checkbox.checked = this.showOptionalPrayers;
        
        // Add event listener
        checkbox.addEventListener('change', () => {
            this.showOptionalPrayers = checkbox.checked;
            localStorage.setItem('showOptionalPrayers', this.showOptionalPrayers);
            
            // Re-display prayer times with new filter
            if (this.prayerData) {
                this.displayPrayerTimes();
            }
        });
    },

    // Show loading state
    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('error').classList.add('hidden');
        document.getElementById('main-content').classList.add('hidden');
    },

    // Show error state
    showError(message) {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('error-message').textContent = message;
    },

    // Show main content
    showContent() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    },

    // Get user's location
    getUserLocation(userInitiated = false) {
        if (!navigator.geolocation) {
            console.log('Geolocation not supported, using fallback');
            this.useFallbackLocation();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.locationMode = 'auto';
                this.fetchPrayerTimes(latitude, longitude);
                
                // Update location display to show it's precise
                setTimeout(() => {
                    const locationDisplay = document.querySelector('#location-name');
                    if (locationDisplay) {
                        locationDisplay.style.opacity = '1';
                    }
                }, 100);
            },
            (error) => {
                console.log('Geolocation error:', error.code, '- Using fallback location');
                
                // If user specifically clicked "Update", show a helpful message
                if (userInitiated && error.code === error.PERMISSION_DENIED) {
                    alert('Location access was denied. To use your precise location, please enable location permissions in your browser settings.\n\nWe\'ll continue showing prayer times based on your approximate location.');
                }
                
                // Use fallback location
                this.useFallbackLocation(error.code === error.PERMISSION_DENIED);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            }
        );
    },

    // Use fallback location when GPS is not available
    async useFallbackLocation(permissionDenied = false) {
        try {
            // First, try IP-based geolocation
            const ipLocation = await this.getLocationFromIP();
            
            if (ipLocation) {
                console.log('✅ Using IP-based location:', ipLocation);
                
                // Show info message to user
                this.showLocationInfo(
                    'Showing approximate location. Click "Update" for precise times.', 
                    ipLocation.city
                );
                
                // Fetch prayer times for IP location
                if (ipLocation.latitude && ipLocation.longitude) {
                    this.fetchPrayerTimes(ipLocation.latitude, ipLocation.longitude);
                } else if (ipLocation.city && ipLocation.country) {
                    this.fetchPrayerTimesByCity(ipLocation.city, ipLocation.country);
                }
                return;
            }
        } catch (error) {
            console.log('IP geolocation failed:', error);
        }

        // If IP geolocation fails, use timezone-based default
        const timezoneLocation = this.getLocationFromTimezone();
        console.log('✅ Using timezone-based location:', timezoneLocation);
        
        this.showLocationInfo(
            'Showing timezone-based location. Click "Update" for precise times.',
            timezoneLocation.city
        );
        
        this.fetchPrayerTimesByCity(timezoneLocation.city, timezoneLocation.country);
    },

    // Get approximate location from IP address
    async getLocationFromIP() {
        try {
            // Using ipapi.co - free tier allows 1000 requests/day
            const response = await fetch('https://ipapi.co/json/');
            
            if (!response.ok) throw new Error('IP API failed');
            
            const data = await response.json();
            
            if (data.city && data.country_name) {
                return {
                    city: data.city,
                    country: data.country_name,
                    latitude: data.latitude,
                    longitude: data.longitude
                };
            }
        } catch (error) {
            console.error('Error fetching IP location:', error);
        }
        
        return null;
    },

    // Get default location based on browser timezone
    getLocationFromTimezone() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Map common timezones to cities
        const timezoneMap = {
            // Americas
            'America/New_York': { city: 'New York', country: 'USA' },
            'America/Chicago': { city: 'Chicago', country: 'USA' },
            'America/Los_Angeles': { city: 'Los Angeles', country: 'USA' },
            'America/Toronto': { city: 'Toronto', country: 'Canada' },
            'America/Mexico_City': { city: 'Mexico City', country: 'Mexico' },
            'America/Sao_Paulo': { city: 'São Paulo', country: 'Brazil' },
            
            // Europe
            'Europe/London': { city: 'London', country: 'UK' },
            'Europe/Paris': { city: 'Paris', country: 'France' },
            'Europe/Berlin': { city: 'Berlin', country: 'Germany' },
            'Europe/Istanbul': { city: 'Istanbul', country: 'Turkey' },
            'Europe/Moscow': { city: 'Moscow', country: 'Russia' },
            
            // Asia
            'Asia/Dubai': { city: 'Dubai', country: 'UAE' },
            'Asia/Karachi': { city: 'Karachi', country: 'Pakistan' },
            'Asia/Kolkata': { city: 'Mumbai', country: 'India' },
            'Asia/Dhaka': { city: 'Dhaka', country: 'Bangladesh' },
            'Asia/Jakarta': { city: 'Jakarta', country: 'Indonesia' },
            'Asia/Singapore': { city: 'Singapore', country: 'Singapore' },
            'Asia/Tokyo': { city: 'Tokyo', country: 'Japan' },
            'Asia/Shanghai': { city: 'Shanghai', country: 'China' },
            'Asia/Riyadh': { city: 'Riyadh', country: 'Saudi Arabia' },
            'Asia/Tehran': { city: 'Tehran', country: 'Iran' },
            
            // Africa
            'Africa/Cairo': { city: 'Cairo', country: 'Egypt' },
            'Africa/Lagos': { city: 'Lagos', country: 'Nigeria' },
            'Africa/Johannesburg': { city: 'Johannesburg', country: 'South Africa' },
            
            // Oceania
            'Australia/Sydney': { city: 'Sydney', country: 'Australia' },
            'Pacific/Auckland': { city: 'Auckland', country: 'New Zealand' }
        };
        
        // Return mapped location or default to Makkah
        return timezoneMap[timezone] || { city: 'Makkah', country: 'Saudi Arabia' };
    },

    // Show info message about location
    showLocationInfo(message, cityName) {
        // We'll show this as a subtle notification at the top
        // For now, just log it - you can enhance this with a toast notification
        console.log('ℹ️', message);
        
        // Update the location display to show it's approximate
        setTimeout(() => {
            const locationDisplay = document.querySelector('#location-name');
            if (locationDisplay && cityName) {
                locationDisplay.textContent = `📍 ${cityName} (approximate)`;
                locationDisplay.style.opacity = '0.8';
            }
        }, 100);
    },

    // Fetch prayer times from API
    async fetchPrayerTimes(latitude, longitude) {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${this.calculationMethod}&school=${this.school}`;

            // Force fresh fetch (bypass cache)
            const response = await fetch(url, { cache: 'no-store' });
            
            if (!response.ok) {
                throw new Error('Failed to fetch prayer times from server');
            }

            const data = await response.json();

            if (data.code !== 200) {
                throw new Error('Invalid response from prayer times API');
            }

            this.prayerData = data.data;
            this.displayPrayerTimes();
            this.startCountdown();
            this.showContent();

        } catch (error) {
            console.error('Error fetching prayer times:', error);
            this.showError('Failed to load prayer times. Please check your internet connection and try again.');
        }
    },

    // Fetch prayer times by city name
    async fetchPrayerTimesByCity(city, country) {
        try {
            const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${this.calculationMethod}&school=${this.school}`;

            // Force fresh fetch (bypass cache)
            const response = await fetch(url, { cache: 'no-store' });
            
            if (!response.ok) {
                throw new Error('Failed to fetch prayer times from server');
            }

            const data = await response.json();

            if (data.code !== 200) {
                throw new Error('Invalid response from prayer times API');
            }

            this.prayerData = data.data;
            this.displayPrayerTimes();
            this.startCountdown();
            this.showContent();

        } catch (error) {
            console.error('Error fetching prayer times:', error);
            this.showError('Failed to load prayer times. Please check your location name and try again.');
        }
    },

    // Display all prayer times
    displayPrayerTimes() {
        const { timings, date, meta } = this.prayerData;
        const t = this.translations[this.currentLang];
        
        // Update location - preserve user-friendly names
        let locationName;
        if (this.locationMode === 'manual' && this.savedLocation) {
            // Manual location
            locationName = `${this.savedLocation.city}, ${this.savedLocation.country}`;
        } else {
            // Auto location - try to get a friendly name from current display or meta
            const currentDisplay = document.getElementById('location-name')?.textContent;
            // If we already have a good display name (not a timezone path), keep it
            if (currentDisplay && !currentDisplay.includes('/') && currentDisplay !== 'Loading...') {
                locationName = currentDisplay;
            } else {
                // Otherwise extract from timezone or use a generic name
                const timezoneParts = meta.timezone?.split('/') || [];
                locationName = timezoneParts[timezoneParts.length - 1]?.replace(/_/g, ' ') || meta.timezone || 'Your Location';
            }
        }
        document.getElementById('location-name').textContent = locationName;

        // Update location address
        const locationAddress = document.getElementById('location-address');
        if (locationAddress) {
            // For now, show timezone or leave empty for future address implementation
            locationAddress.textContent = meta.timezone || '';
        }

        // Update nearby mosque link with coordinates
        this.updateMosqueLink(meta.latitude, meta.longitude);

        // Update dates in header (old format - kept for compatibility)
        const gregorianDate = date.readable;
        const hijriDate = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`;
        if (document.getElementById('gregorian-date-header')) {
            document.getElementById('gregorian-date-header').textContent = gregorianDate;
        }
        if (document.getElementById('hijri-date-header')) {
            document.getElementById('hijri-date-header').textContent = hijriDate;
        }
        
        // Update top bar full dates
        if (document.getElementById('gregorian-date-full')) {
            const gregorianFull = `${date.gregorian.weekday.en}, ${date.gregorian.month.en} ${date.gregorian.day}, ${date.gregorian.year}`;
            document.getElementById('gregorian-date-full').textContent = gregorianFull;
        }
        if (document.getElementById('hijri-date-full')) {
            const hijriFull = `${date.hijri.weekday.ar} ${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year} ${date.hijri.designation.abbreviated}`;
            document.getElementById('hijri-date-full').textContent = hijriFull;
        }

        // Create prayer time cards
        const gridContainer = document.getElementById('prayer-times-grid');
        gridContainer.innerHTML = '';

        this.prayers.forEach(prayer => {
            // Skip optional prayers if toggle is off
            if (prayer.optional && !this.showOptionalPrayers) return;
            
            const time = timings[prayer.name];
            if (!time) return;

            const card = document.createElement('div');
            card.className = 'prayer-time-card';
            
            // Add optional class for styling
            if (prayer.optional) {
                card.classList.add('optional-prayer');
            }
            
            card.style.setProperty('--accent-color', prayer.color);
            card.dataset.prayer = prayer.name;

            // Use custom label if available (e.g., "Tahajjud Time" for Lastthird)
            const displayName = prayer.label ? t.prayers[prayer.name] || prayer.label : t.prayers[prayer.name] || prayer.name;

            card.innerHTML = `
                <div class="prayer-info">
                    <span class="prayer-icon">${prayer.icon}</span>
                    <span class="prayer-name">${displayName}</span>
                    <span class="prayer-time">${this.formatTime(time)}</span>
                </div>
            `;

            gridContainer.appendChild(card);
        });

        // Update settings indicator
        this.updateSettingsIndicator();
    },

    // Update nearby mosque link
    updateMosqueLink(latitude, longitude) {
        const mosqueLink = document.getElementById('nearby-mosque-link');
        if (!mosqueLink) return;

        // If manual location is set, search by city name for better results
        if (this.locationMode === 'manual' && this.savedLocation) {
            const searchQuery = `mosque in ${this.savedLocation.city}, ${this.savedLocation.country}`;
            const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
            mosqueLink.href = mapsUrl;
        } 
        // For auto-detected location, use coordinates with proper query format
        else if (latitude && longitude) {
            // Use the query parameter format which works better on mobile
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=mosque&query_place_id=&center=${latitude},${longitude}&zoom=14`;
            mosqueLink.href = mapsUrl;
        } else {
            // Fallback: just search for mosques (should rarely happen)
            mosqueLink.href = 'https://www.google.com/maps/search/mosque';
        }
    },

    // Format time (24h to 12h with AM/PM)
    formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        let hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minutes} ${ampm}`;
    },

    // Parse time string to today's Date object
    parseTimeToDate(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    },

    // Find next prayer
    findNextPrayer() {
        const now = new Date();
        const { timings } = this.prayerData;
        
        // Get only mandatory prayers for countdown (exclude optional prayers and Sunrise)
        const prayerTimes = this.prayers
            .filter(p => !p.skipInCountdown && !p.optional)
            .map(prayer => ({
                ...prayer,
                time: timings[prayer.name],
                date: this.parseTimeToDate(timings[prayer.name])
            }));

        // Find the next prayer
        for (let prayer of prayerTimes) {
            if (prayer.date > now) {
                return prayer;
            }
        }

        // If no prayer found today, return Fajr for tomorrow (first mandatory prayer)
        const fajr = prayerTimes.find(p => p.name === 'Fajr') || prayerTimes[0];
        fajr.date.setDate(fajr.date.getDate() + 1);
        return fajr;
    },

    // Start countdown timer
    startCountdown() {
        // Clear existing interval if any
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        const updateCountdown = () => {
            this.nextPrayer = this.findNextPrayer();
            const now = new Date();
            const diff = this.nextPrayer.date - now;

            if (diff <= 0) {
                // Prayer time reached, refresh to get next prayer
                this.fetchPrayerTimes(
                    this.prayerData.meta.latitude,
                    this.prayerData.meta.longitude
                );
                return;
            }

            // Calculate time components
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Update display with translated prayer name
            const t = this.translations[this.currentLang];
            const translatedPrayerName = t.prayers[this.nextPrayer.name] || this.nextPrayer.name;
            
            document.getElementById('next-prayer-name').textContent = translatedPrayerName;
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            // Highlight current/next prayer in the list
            this.highlightNextPrayer();
        };

        // Update immediately and then every second
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    },

    // Highlight the next prayer in the list
    highlightNextPrayer() {
        // Remove all active classes
        document.querySelectorAll('.prayer-time-card').forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to next prayer
        if (this.nextPrayer) {
            const card = document.querySelector(`[data-prayer="${this.nextPrayer.name}"]`);
            if (card) {
                card.classList.add('active');
            }
        }
    },

    // Switch between pages
    switchPage(page) {
        // Hide all pages
        const prayerTimesPage = document.getElementById('prayer-times-page');
        const dateConverterPage = document.getElementById('date-converter-page');
        const asmaUlHusnaPage = document.getElementById('asma-ul-husna-page');
        
        // Hide all
        if (prayerTimesPage) prayerTimesPage.style.display = 'none';
        if (dateConverterPage) dateConverterPage.style.display = 'none';
        if (asmaUlHusnaPage) asmaUlHusnaPage.style.display = 'none';
        
        // Show selected page
        if (page === 'prayer-times') {
            if (prayerTimesPage) prayerTimesPage.style.display = '';
        } else if (page === 'date-converter') {
            if (dateConverterPage) {
                dateConverterPage.style.display = '';
                this.initDateConverter();
            }
        } else if (page === 'asma-ul-husna') {
            if (asmaUlHusnaPage) {
                asmaUlHusnaPage.style.display = '';
                this.init99Names();
            }
        }
    },

    // Initialize Date Converter
    initDateConverter() {
        // Always display today's dates
        this.displayTodayDates();
        
        // Only initialize event listeners once
        if (this.dateConverterInitialized) return;
        this.dateConverterInitialized = true;
        
        const conversionBtns = document.querySelectorAll('.conversion-btn');
        const gregorianToHijri = document.getElementById('gregorian-to-hijri');
        const hijriToGregorian = document.getElementById('hijri-to-gregorian');
        const convertToHijriBtn = document.getElementById('convert-to-hijri-btn');
        const convertToGregorianBtn = document.getElementById('convert-to-gregorian-btn');
        
        // Set today's date as default
        const today = new Date();
        const gregorianInput = document.getElementById('gregorian-date-input');
        if (gregorianInput && !gregorianInput.value) {
            gregorianInput.value = today.toISOString().split('T')[0];
        }
        
        // Toggle conversion direction
        conversionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                conversionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (btn.dataset.direction === 'gregorian-to-hijri') {
                    gregorianToHijri.classList.remove('hidden');
                    hijriToGregorian.classList.add('hidden');
                } else {
                    gregorianToHijri.classList.add('hidden');
                    hijriToGregorian.classList.remove('hidden');
                }
            });
        });
        
        // Convert Gregorian to Hijri
        if (convertToHijriBtn) {
            convertToHijriBtn.onclick = () => this.convertGregorianToHijri();
        }
        
        // Convert Hijri to Gregorian
        if (convertToGregorianBtn) {
            convertToGregorianBtn.onclick = () => this.convertHijriToGregorian();
        }
    },

    // Convert Gregorian to Hijri
    async convertGregorianToHijri() {
        const input = document.getElementById('gregorian-date-input');
        const resultCard = document.getElementById('hijri-result');
        const dateDisplay = document.getElementById('hijri-date-display');
        const dateDetails = document.getElementById('hijri-date-details');
        
        if (!input.value) {
            alert('Please select a date');
            return;
        }
        
        const date = new Date(input.value);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        
        try {
            const response = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
            const data = await response.json();
            
            if (data.code === 200) {
                const hijri = data.data.hijri;
                dateDisplay.textContent = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
                dateDetails.textContent = `${hijri.month.ar} ${hijri.year} هـ`;
                resultCard.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error converting date:', error);
            alert('Failed to convert date. Please try again.');
        }
    },

    // Convert Hijri to Gregorian
    async convertHijriToGregorian() {
        const dayInput = document.getElementById('hijri-day');
        const monthInput = document.getElementById('hijri-month');
        const yearInput = document.getElementById('hijri-year');
        const resultCard = document.getElementById('gregorian-result');
        const dateDisplay = document.getElementById('gregorian-date-display');
        const dateDetails = document.getElementById('gregorian-date-details');
        
        if (!dayInput.value || !monthInput.value || !yearInput.value) {
            alert('Please enter day, month, and year');
            return;
        }
        
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;
        
        try {
            const response = await fetch(`https://api.aladhan.com/v1/hToG/${day}-${month}-${year}`);
            const data = await response.json();
            
            if (data.code === 200) {
                const gregorian = data.data.gregorian;
                const date = new Date(gregorian.year, gregorian.month.number - 1, gregorian.day);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                
                dateDisplay.textContent = date.toLocaleDateString('en-US', options);
                dateDetails.textContent = `${gregorian.day}/${gregorian.month.number}/${gregorian.year}`;
                resultCard.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error converting date:', error);
            alert('Failed to convert date. Please try again.');
        }
    },

    // Display today's dates
    async displayTodayDates() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        const todayGregorian = document.getElementById('today-gregorian');
        const todayHijri = document.getElementById('today-hijri');
        
        if (todayGregorian) {
            todayGregorian.textContent = today.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        try {
            const response = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
            const data = await response.json();
            
            if (data.code === 200 && todayHijri) {
                const hijri = data.data.hijri;
                todayHijri.textContent = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
            }
        } catch (error) {
            console.error('Error fetching today\'s Hijri date:', error);
        }
    },

    // Initialize 99 Names Page
    async init99Names() {
        const loading = document.getElementById('names-loading');
        const grid = document.getElementById('names-grid');
        
        // Show loading, hide grid
        if (loading) loading.style.display = 'flex';
        if (grid) grid.style.display = 'none';
        
        try {
            // Load from local JSON file (static data)
            const response = await fetch('data/99-names.json');
            const data = await response.json();
            
            if (data.code === 200) {
                this.display99Names(data.data);
                if (loading) loading.style.display = 'none';
                if (grid) grid.style.display = 'grid';
            }
        } catch (error) {
            console.error('Error loading 99 names:', error);
            if (loading) {
                loading.innerHTML = '<p style="color: var(--text-light);">Failed to load names. Please try again.</p>';
            }
        }
    },

    // Display 99 Names
    display99Names(names) {
        const grid = document.getElementById('names-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        names.forEach((name, index) => {
            const card = document.createElement('div');
            card.className = 'name-card';
            card.innerHTML = `
                <div class="name-number">${index + 1}</div>
                <div class="name-arabic">${name.name}</div>
                <div class="name-transliteration">${name.transliteration}</div>
                <div class="name-translation">${name.en.meaning}</div>
            `;
            
            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            });
            
            grid.appendChild(card);
        });
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000); // Check every hour
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            console.log('🔄 New version available! Refresh to update.');
                            
                            // Optionally show a notification to user
                            if (confirm('A new version is available! Refresh to update?')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
        
        // Handle service worker controller change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 Service Worker controller changed');
        });
    });
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    console.log('💾 PWA install prompt available');
    
    // Optionally, show your own install button
    // You can add a button in the UI and trigger installation like this:
    // deferredPrompt.prompt();
    // deferredPrompt.userChoice.then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //         console.log('User accepted the install prompt');
    //     }
    //     deferredPrompt = null;
    // });
});

window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    deferredPrompt = null;
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('🌐 Back online');
    // Optionally refresh prayer times
    if (App.locationMode === 'manual' && App.savedLocation) {
        App.fetchPrayerTimesByCity(App.savedLocation.city, App.savedLocation.country);
    } else {
        App.getUserLocation();
    }
});

window.addEventListener('offline', () => {
    console.log('📴 Gone offline - using cached data');
});

