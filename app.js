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
    dateConverterInitialized: false,

    // Prayer configurations
    prayers: [
        { name: 'Fajr', icon: '🌅', color: '#667eea' },
        { name: 'Sunrise', icon: '☀️', color: '#f6d365', skipInCountdown: true },
        { name: 'Dhuhr', icon: '🌞', color: '#f093fb' },
        { name: 'Asr', icon: '🌤️', color: '#4facfe' },
        { name: 'Maghrib', icon: '🌆', color: '#fa709a' },
        { name: 'Isha', icon: '🌙', color: '#764ba2' }
    ],

    // Translations
    translations: {
        en: {
            timeUntil: 'Time until',
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
            prayers: {
                Fajr: 'Fajr',
                Sunrise: 'Sunrise',
                Dhuhr: 'Dhuhr',
                Asr: 'Asr',
                Maghrib: 'Maghrib',
                Isha: 'Isha'
            }
        },
        ur: {
            timeUntil: 'نماز تک وقت',
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
            prayers: {
                Fajr: 'فجر',
                Sunrise: 'طلوع آفتاب',
                Dhuhr: 'ظہر',
                Asr: 'عصر',
                Maghrib: 'مغرب',
                Isha: 'عشاء'
            }
        },
        ar: {
            timeUntil: 'الوقت المتبقي حتى',
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
            prayers: {
                Fajr: 'الفجر',
                Sunrise: 'الشروق',
                Dhuhr: 'الظهر',
                Asr: 'العصر',
                Maghrib: 'المغرب',
                Isha: 'العشاء'
            }
        },
        hi: {
            timeUntil: 'नमाज़ तक समय',
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
            prayers: {
                Fajr: 'फ़ज्र',
                Sunrise: 'सूर्योदय',
                Dhuhr: 'ज़ुहर',
                Asr: 'अस्र',
                Maghrib: 'मग़रिब',
                Isha: 'इशा'
            }
        }
    },

    // Initialize app
    init() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.savedLocation = JSON.parse(localStorage.getItem('savedLocation'));
        this.calculationMethod = parseInt(localStorage.getItem('calculationMethod')) || 2;
        this.initNavigation();
        this.initTheme();
        this.initLanguage();
        this.initLocationModal();
        this.initCalculationMethod();
        this.showLoading();
        
        // Check if user has saved location preference
        if (this.savedLocation) {
            this.locationMode = 'manual';
            this.fetchPrayerTimesByCity(this.savedLocation.city, this.savedLocation.country);
        } else {
            this.getUserLocation();
        }
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
        if (this.currentLang === 'ar' || this.currentLang === 'ur') {
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

    // Initialize theme
    initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        // Add click event listener to theme toggle button
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    // Toggle theme
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    },

    // Initialize calculation method
    initCalculationMethod() {
        const methodButtons = document.querySelectorAll('.method-btn');
        
        // Set active button based on saved method
        methodButtons.forEach(btn => {
            const method = parseInt(btn.dataset.method);
            if (method === this.calculationMethod) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            // Add click event
            btn.addEventListener('click', () => {
                this.switchCalculationMethod(method);
            });
        });
    },

    // Switch calculation method
    switchCalculationMethod(method) {
        if (this.calculationMethod === method) return;
        
        this.calculationMethod = method;
        localStorage.setItem('calculationMethod', method);
        
        // Update active button
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.method) === method);
        });
        
        // Reload prayer times with new method
        this.showLoading();
        if (this.locationMode === 'manual' && this.savedLocation) {
            this.fetchPrayerTimesByCity(this.savedLocation.city, this.savedLocation.country);
        } else if (this.prayerData && this.prayerData.meta) {
            // Use last known coordinates
            this.fetchPrayerTimes(this.prayerData.meta.latitude, this.prayerData.meta.longitude);
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
        
        // Show loading and get current location
        this.showLoading();
        this.getUserLocation();
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
    getUserLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser. Please enable location services or use a modern browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.fetchPrayerTimes(latitude, longitude);
            },
            (error) => {
                let message = 'Unable to retrieve your location. ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message += 'Please allow location access to see prayer times for your area.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        message += 'Location request timed out.';
                        break;
                    default:
                        message += 'An unknown error occurred.';
                }
                this.showError(message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            }
        );
    },

    // Fetch prayer times from API
    async fetchPrayerTimes(latitude, longitude) {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${this.calculationMethod}`;

            const response = await fetch(url);
            
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
            const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${this.calculationMethod}`;

            const response = await fetch(url);
            
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
        
        // Update location
        let locationName = meta.timezone || 'Your Location';
        if (this.locationMode === 'manual' && this.savedLocation) {
            locationName = `${this.savedLocation.city}, ${this.savedLocation.country}`;
        }
        document.getElementById('location-name').textContent = locationName;

        // Update nearby mosque link with coordinates
        this.updateMosqueLink(meta.latitude, meta.longitude);

        // Update dates in header
        const gregorianDate = date.readable;
        const hijriDate = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`;
        document.getElementById('gregorian-date-header').textContent = gregorianDate;
        document.getElementById('hijri-date-header').textContent = hijriDate;

        // Create prayer time cards
        const gridContainer = document.getElementById('prayer-times-grid');
        gridContainer.innerHTML = '';

        this.prayers.forEach(prayer => {
            const time = timings[prayer.name];
            if (!time) return;

            const card = document.createElement('div');
            card.className = 'prayer-time-card';
            card.style.setProperty('--accent-color', prayer.color);
            card.dataset.prayer = prayer.name;

            const prayerName = t.prayers[prayer.name] || prayer.name;

            card.innerHTML = `
                <div class="prayer-info">
                    <span class="prayer-icon">${prayer.icon}</span>
                    <span class="prayer-name">${prayerName}</span>
                    <span class="prayer-time">${this.formatTime(time)}</span>
                </div>
            `;

            gridContainer.appendChild(card);
        });
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
        
        // Get prayers that should be included in countdown (excluding Sunrise)
        const prayerTimes = this.prayers
            .filter(p => !p.skipInCountdown)
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

        // If no prayer found today, return Fajr for tomorrow
        const fajr = prayerTimes[0];
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
            const response = await fetch('https://api.aladhan.com/v1/asmaAlHusna');
            const data = await response.json();
            
            if (data.code === 200) {
                this.display99Names(data.data);
                if (loading) loading.style.display = 'none';
                if (grid) grid.style.display = 'grid';
            }
        } catch (error) {
            console.error('Error fetching 99 names:', error);
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

