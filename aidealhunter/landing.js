/* =====================================================
   AI Deal Hunter - Premium Landing Page JavaScript
   ===================================================== */

(function() {
    'use strict';

    // =====================================================
    // Prompt Templates for Copy Functionality
    // =====================================================
    const PROMPTS = {
        1: `You are an expert real estate investment analyst AI. Your task is to assess the likely level of motivation of a property owner to sell on a scale of 1-10 (10 being extremely motivated, ready to sell immediately; 1 being no motivation whatsoever).

**Input Data I Will Provide:**
- Property Address: [INSERT ADDRESS]
- Owner Name: [INSERT OWNER NAME]
- Known Data Points (e.g., Pre-foreclosure status, Probate filing, Tax delinquency, Code violations, Length of ownership, etc.): [INSERT DATA POINTS]

**Your Output:**
1. **Motivation Score:** [1-10]
2. **Justification:** Identify and explain the top 3 motivation signals present in the data. For each signal, explain why it suggests a higher or lower motivation to sell.
3. **Confidence Level:** [High/Medium/Low] - How confident are you in this score based on the data provided?`,

        2: `You are an expert real estate property analyst AI. Your task is to provide a 'Property Condition Score' from 1-5 based on the available data (1 = Excellent, well-maintained; 5 = Major Rehab Needed, significant deferred maintenance).

**Input Data I Will Provide:**
- Property Address: [INSERT ADDRESS]
- Property Age/Year Built: [INSERT YEAR]
- Tax Assessment Data (e.g., assessed value, land vs. improvement ratio): [INSERT TAX DATA]
- Permit History (e.g., recent permits for roof, HVAC, plumbing, electrical): [INSERT PERMIT INFO]
- Code Violation History: [INSERT VIOLATION DATA]
- Any other relevant information: [INSERT OTHER INFO]

**Your Output:**
1. **Property Condition Score:** [1-5]
2. **Signs of Neglect/Condition Issues:** Describe any visible or inferred signs of neglect or deferred maintenance based on the data.
3. **Key Factors:** List the top 3 factors that influenced your score.
4. **Estimated Rehab Level:** [Light cosmetic / Moderate / Significant / Full Gut Rehab]`,

        3: `You are an expert real estate financial analyst AI. Your task is to estimate the property owner's equity position and summarize their likely overall financial situation to determine if a cash offer would be highly attractive to them.

**Input Data I Will Provide:**
- Property Address: [INSERT ADDRESS]
- Estimated Current Market Value: [INSERT VALUE]
- Original Purchase Price & Date: [INSERT PURCHASE INFO]
- Known Mortgage(s) & Lien(s): [INSERT MORTGAGE/LIEN INFO - e.g., original loan amount, estimated balance, lien amounts]
- Owner's Other Known Financial Indicators (e.g., bankruptcy filing, other properties owned, employment status if known): [INSERT INFO]

**Your Output:**
1. **Estimated Equity Position:** $[AMOUNT] ([Percentage]% of market value)
2. **Financial Situation Summary:** A brief (2-3 sentence) summary of the owner's likely financial health and pressure points.
3. **Cash Offer Attractiveness:** [High / Medium / Low] - Would a fast, certain cash offer be particularly appealing to this owner? Explain your reasoning.
4. **Key Financial Signals:** List the top 3 financial indicators that influenced your analysis.`,

        4: `You are an expert real estate market analyst AI. Your task is to provide a 'Neighborhood Pulse' report that gives quick insights into the micro-market conditions for a specific property's area.

**Input Data I Will Provide:**
- Property Address or Zip Code: [INSERT ADDRESS/ZIP]
- (Optional) Specific property type focus (e.g., single-family, multi-family): [INSERT TYPE]

**Your Output (Neighborhood Pulse Report):**
1. **Average Days on Market (DOM):** [NUMBER] days (compared to [City/County Average])
2. **6-Month Price Appreciation Rate:** [PERCENTAGE]%
3. **Market Status:** [Strong Seller's Market / Seller's Market / Balanced / Buyer's Market / Strong Buyer's Market]
4. **Investor Activity Level:** [High / Medium / Low] - Are other investors actively buying in this area?
5. **Key Neighborhood Trends:** 2-3 bullet points on relevant trends (e.g., new development, demographic shifts, school ratings, crime trends).
6. **Opportunity Assessment:** A brief (1-2 sentence) assessment of whether this is a good area for a quick flip vs. buy-and-hold.`,

        5: `You are an expert real estate investment analyst AI. You have previously analyzed this property for Seller Motivation, Property Condition, Financial/Equity Position, and Neighborhood Market conditions. Now, synthesize all of these analyses to generate a single 'Deal Readiness Score' from 1-100.

**A score of 100 represents:**
- A highly motivated seller
- A property in a condition suitable for investment
- An owner with a financial situation that makes a cash offer very attractive
- A favorable neighborhood market

**A score of 1 represents:**
- An unmotivated seller
- A property in excellent condition (no discount expected)
- An owner with no financial pressure
- An unfavorable or stagnant market

**Input Data I Will Provide (Summaries from previous analyses):**
- Seller Motivation Score (1-10) & Key Signals: [INSERT]
- Property Condition Score (1-5) & Key Issues: [INSERT]
- Estimated Equity & Cash Offer Attractiveness: [INSERT]
- Neighborhood Market Status & DOM: [INSERT]

**Your Output:**
1. **Deal Readiness Score:** [1-100]
2. **Score Breakdown:**
    - Motivation Component: [X/25 points]
    - Property Condition Component: [X/25 points]
    - Financial Component: [X/25 points]
    - Market Component: [X/25 points]
3. **Overall Assessment:** A brief (2-3 sentence) summary of why this deal scores the way it does and the primary opportunity or risk.
4. **Recommended Action:** [Call Immediately / Nurture & Follow Up / Monitor & Automate / Discard]`,

        6: `You are an expert real estate communication and sales strategist AI. Your task is to write a brief, empathetic first-contact script (2-3 sentences) for an investor reaching out to a potential motivated seller. The goal of this first contact is NOT to make an offer. It is simply to open a door to a conversation.

**Input Data I Will Provide:**
- Key Motivation Signal Identified (e.g., Pre-foreclosure, Probate, Inherited Property, Divorce): [INSERT SIGNAL]
- Preferred Contact Method (Phone Call / Voicemail / Door Knock / Direct Mail / Text): [INSERT METHOD]
- (Optional) Owner's First Name: [INSERT NAME]

**Your Output:**
1. **Opening Script:** [2-3 sentences tailored to the motivation signal and contact method. The tone should be helpful, non-pushy, and acknowledge their potential situation with empathy without being presumptuous.]
2. **Key Principle Used:** Briefly explain the psychological principle behind your approach (e.g., building rapport, acknowledging difficulty, offering a simple next step).`,

        7: `You are an expert real estate negotiation strategist AI. Your task is to identify the top 2 objections this specific type of motivated seller is most likely to have when presented with a cash offer from an investor. Then, provide a one-sentence response for each that acknowledges their concern and reframes it.

**Input Data I Will Provide:**
- Primary Motivation Signal (e.g., Pre-foreclosure, Probate, Tired Landlord, Divorce): [INSERT SIGNAL]
- Seller's Likely Situation Summary: [INSERT BRIEF SUMMARY]
- (Optional) Any known specific concerns: [INSERT CONCERNS]

**Your Output:**
1. **Objection 1:** "[State the likely objection]"
    - **Response:** "[Your one-sentence acknowledging and reframing response]"
2. **Objection 2:** "[State the likely objection]"
    - **Response:** "[Your one-sentence acknowledging and reframing response]"
3. **Underlying Fear:** Briefly identify the core emotional fear driving these objections (e.g., fear of being taken advantage of, fear of judgment, fear of the unknown).`
    };

    // =====================================================
    // DOM Elements
    // =====================================================
    const DOM = {
        promptsTrack: document.getElementById('promptsTrack'),
        promptPrev: document.getElementById('promptPrev'),
        promptNext: document.getElementById('promptNext'),
        promptDots: document.getElementById('promptDots'),
        promptSlides: null, // Will be populated after DOM ready
        toastContainer: document.getElementById('toastContainer'),
        copyButtons: document.querySelectorAll('.copy-btn'),
        animateElements: document.querySelectorAll('.animate-on-scroll'),
        nav: document.querySelector('.nav'),
        scaleChart: document.getElementById('scaleChart'),
        progressBar: document.getElementById('progressBar'),
        progressFill: document.getElementById('progressFill'),
        videoTriggerBtn: document.getElementById('videoTriggerBtn'),
        videoModal: document.getElementById('videoModal'),
        videoModalBackdrop: document.getElementById('videoModalBackdrop'),
        videoModalClose: document.getElementById('videoModalClose'),
        videoModalContent: document.getElementById('videoModalContent')
    };

    // =====================================================
    // State
    // =====================================================
    let currentSlide = 0;
    const totalSlides = 7;

    // =====================================================
    // Initialize
    // =====================================================
    function init() {
        // Populate prompt slides after DOM ready
        DOM.promptSlides = document.querySelectorAll('.prompt-slide');

        setupScrollAnimations();
        setupPromptsCarousel();
        setupCopyButtons();
        setupNavScrollEffect();
        setupSmoothScroll();
        setupScaleChartAnimation();
        setupProgressBar();
        setupVideoModal();
    }

    // =====================================================
    // Scroll Animations
    // =====================================================
    function setupScrollAnimations() {
        if (!DOM.animateElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on data attribute or index
                    const delay = entry.target.classList.contains('animate-delay-1') ? 100 :
                                  entry.target.classList.contains('animate-delay-2') ? 200 :
                                  entry.target.classList.contains('animate-delay-3') ? 300 : 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    // Optionally unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        DOM.animateElements.forEach(el => observer.observe(el));
    }

    // =====================================================
    // Prompts Carousel
    // =====================================================
    function setupPromptsCarousel() {
        if (!DOM.promptsTrack) return;

        // Create dots
        createDots();

        // Set initial position
        updateCarousel();

        // Event listeners for nav buttons
        DOM.promptPrev?.addEventListener('click', () => goToSlide(currentSlide - 1));
        DOM.promptNext?.addEventListener('click', handleNextClick);

        // Click-to-select functionality for prompt slides
        DOM.promptSlides?.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index !== currentSlide) {
                    goToSlide(index);
                }
            });
            // Add cursor pointer for non-active slides
            slide.style.cursor = 'pointer';
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        DOM.promptsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        DOM.promptsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (diff > swipeThreshold) {
                // Swipe left - go next
                goToSlide(currentSlide + 1);
            } else if (diff < -swipeThreshold) {
                // Swipe right - go prev
                goToSlide(currentSlide - 1);
            }
        }

        // Keyboard navigation when carousel is in view
        document.addEventListener('keydown', (e) => {
            if (!isCarouselInView()) return;

            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        });
    }

    function createDots() {
        if (!DOM.promptDots) return;

        DOM.promptDots.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `dot${i === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Go to prompt ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            DOM.promptDots.appendChild(dot);
        }
    }

    function handleNextClick() {
        if (currentSlide === totalSlides - 1) {
            // On last slide, restart to first
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }

    function goToSlide(index) {
        // Handle wrapping
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        if (!DOM.promptsTrack) return;

        // Get slide width including gap
        const slideElement = DOM.promptsTrack.querySelector('.prompt-slide');
        if (!slideElement) return;

        const slideStyles = getComputedStyle(slideElement);
        const slideWidth = slideElement.offsetWidth;
        const gap = parseFloat(getComputedStyle(DOM.promptsTrack).gap) || 24;

        // Calculate offset
        const offset = currentSlide * (slideWidth + gap);

        DOM.promptsTrack.style.transform = `translateX(-${offset}px)`;

        // Update slide states (active, adjacent, faded)
        DOM.promptSlides?.forEach((slide, i) => {
            slide.classList.remove('active', 'adjacent');

            if (i === currentSlide) {
                slide.classList.add('active');
            } else if (i === currentSlide - 1 || i === currentSlide + 1) {
                slide.classList.add('adjacent');
            }
        });

        // Update dots
        const dots = DOM.promptDots?.querySelectorAll('.dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // Update button states
        DOM.promptPrev?.classList.toggle('disabled', currentSlide === 0);

        // Transform next button to restart when on last slide
        if (currentSlide === totalSlides - 1) {
            DOM.promptNext?.classList.add('restart');
            DOM.promptNext?.setAttribute('aria-label', 'Restart from first prompt');
        } else {
            DOM.promptNext?.classList.remove('restart');
            DOM.promptNext?.setAttribute('aria-label', 'Next prompt');
        }
    }

    function isCarouselInView() {
        if (!DOM.promptsTrack) return false;

        const rect = DOM.promptsTrack.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // =====================================================
    // Copy Prompt Functionality
    // =====================================================
    function setupCopyButtons() {
        DOM.copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const promptId = button.dataset.prompt;
                const promptText = PROMPTS[promptId];

                if (promptText) {
                    copyToClipboard(promptText, button);
                }
            });
        });
    }

    async function copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);

            // Update button state
            const span = button.querySelector('span');
            const originalText = span?.textContent;

            button.classList.add('copied');
            if (span) span.textContent = 'Copied!';

            // Show toast
            showToast('Prompt copied to clipboard!');

            // Reset button after delay
            setTimeout(() => {
                button.classList.remove('copied');
                if (span) span.textContent = originalText;
            }, 2000);

        } catch (err) {
            // Fallback for older browsers
            fallbackCopy(text, button);
        }
    }

    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');

            const span = button.querySelector('span');
            const originalText = span?.textContent;

            button.classList.add('copied');
            if (span) span.textContent = 'Copied!';

            showToast('Prompt copied to clipboard!');

            setTimeout(() => {
                button.classList.remove('copied');
                if (span) span.textContent = originalText;
            }, 2000);

        } catch (err) {
            showToast('Failed to copy. Please try again.');
        }

        document.body.removeChild(textarea);
    }

    // =====================================================
    // Toast Notifications
    // =====================================================
    function showToast(message) {
        if (!DOM.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${message}</span>
        `;

        DOM.toastContainer.appendChild(toast);

        // Remove toast after animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // =====================================================
    // Navigation Scroll Effect
    // =====================================================
    function setupNavScrollEffect() {
        if (!DOM.nav) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;

                    // Add/remove scrolled class for background change
                    DOM.nav.classList.toggle('scrolled', currentScroll > 50);

                    // Hide nav when scrolling down, show when scrolling up
                    if (currentScroll > lastScroll && currentScroll > 100) {
                        // Scrolling down - hide nav
                        DOM.nav.classList.add('nav--hidden');
                        DOM.nav.classList.remove('nav--visible');
                    } else {
                        // Scrolling up - show nav with animation
                        DOM.nav.classList.remove('nav--hidden');
                        DOM.nav.classList.add('nav--visible');
                    }

                    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
                    ticking = false;
                });

                ticking = true;
            }
        }, { passive: true });
    }

    // =====================================================
    // Smooth Scroll for Anchor Links
    // =====================================================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const navHeight = DOM.nav?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // =====================================================
    // Scale Chart Animation
    // =====================================================
    function setupScaleChartAnimation() {
        if (!DOM.scaleChart) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20% 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay before starting animation for better effect
                    setTimeout(() => {
                        DOM.scaleChart.classList.add('animated');
                    }, 200);

                    // Unobserve after animation triggered
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(DOM.scaleChart);
    }

    // =====================================================
    // Progress Bar
    // =====================================================
    function setupProgressBar() {
        if (!DOM.progressFill) return;

        let ticking = false;

        function updateProgressBar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            DOM.progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgressBar();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial call
        updateProgressBar();
    }

    // =====================================================
    // Utility: Debounce
    // =====================================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // =====================================================
    // Handle Window Resize
    // =====================================================
    const handleResize = debounce(() => {
        updateCarousel();
    }, 150);

    window.addEventListener('resize', handleResize);

    // =====================================================
    // Video Modal
    // =====================================================
    function setupVideoModal() {
        if (!DOM.videoTriggerBtn || !DOM.videoModal) return;

        // Wistia video embed HTML
        const wistiaEmbed = `
            <script src="https://fast.wistia.com/player.js" async></script>
            <script src="https://fast.wistia.com/embed/k7f3fnunml.js" async type="module"></script>
            <style>
                wistia-player[media-id='k7f3fnunml']:not(:defined) {
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/k7f3fnunml/swatch');
                    display: block;
                    filter: blur(5px);
                    padding-top: 56.25%;
                }
            </style>
            <wistia-player media-id="k7f3fnunml" seo="false" aspect="1.7777777777777777"></wistia-player>
        `;

        // Open modal on trigger button click
        DOM.videoTriggerBtn.addEventListener('click', openVideoModal);

        // Close modal on backdrop click
        DOM.videoModalBackdrop?.addEventListener('click', closeVideoModal);

        // Close modal on close button click
        DOM.videoModalClose?.addEventListener('click', closeVideoModal);

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });

        function openVideoModal() {
            // Inject video embed into modal content
            if (DOM.videoModalContent) {
                DOM.videoModalContent.innerHTML = wistiaEmbed;
            }

            // Show modal
            DOM.videoModal.classList.add('active');
            DOM.videoModal.setAttribute('aria-hidden', 'false');

            // Prevent body scroll
            document.body.classList.add('modal-open');

            // Focus close button for accessibility
            setTimeout(() => {
                DOM.videoModalClose?.focus();
            }, 100);
        }

        function closeVideoModal() {
            // Hide modal
            DOM.videoModal.classList.remove('active');
            DOM.videoModal.setAttribute('aria-hidden', 'true');

            // Restore body scroll
            document.body.classList.remove('modal-open');

            // Clear video content to stop playback
            setTimeout(() => {
                if (DOM.videoModalContent) {
                    DOM.videoModalContent.innerHTML = '';
                }
            }, 300); // Wait for transition to complete

            // Return focus to trigger button
            DOM.videoTriggerBtn?.focus();
        }
    }

    // =====================================================
    // Initialize on DOM Ready
    // =====================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
