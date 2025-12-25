
let isLandscape = false;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let hasStarted = false; // Flag để track xem đã click "Bắt đầu" chưa

// Preload ảnh background cho gift page ngay từ đầu (không đợi DOMContentLoaded)
const bgImagePreload = new Image();
bgImagePreload.src = 'assets/images/background1.jpg';
// Cache ảnh vào memory
window.giftBackgroundImage = bgImagePreload;


function checkOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const orientationLock = document.getElementById('orientation-lock');
    const mainCanvas = document.querySelector('.canvas');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const musicControl = document.getElementById('musicControl');

    if (!isMobile) {
        isLandscape = true;
        orientationLock.style.display = 'none';
        // Chỉ phát video và hiệu ứng nếu đã click "Bắt đầu"
        if (hasStarted) {
            mainCanvas.style.display = 'block';
            if (backgroundVideo) {
                backgroundVideo.style.display = 'block';
                backgroundVideo.style.visibility = 'visible';
                backgroundVideo.play().catch(e => console.log('Video autoplay prevented:', e));
            }
            // Phát nhạc nếu có
            const christmasAudio = document.getElementById('christmasAudio');
            if (christmasAudio) {
                christmasAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
            }
            // Khởi động website
            startWebsite();
        }
    } else {
        const mediaQuery = window.matchMedia("(orientation: landscape)");
        isLandscape = mediaQuery.matches;

        if (isLandscape) {
            orientationLock.style.display = 'none';
            // Chỉ phát video và hiệu ứng nếu đã click "Bắt đầu"
            if (hasStarted) {
                // Hiển thị lại button phát nhạc khi đã xoay ngang
                if (musicControl) {
                    musicControl.style.display = 'block';
                }
                // Phát video và hiệu ứng khi xoay ngang
                mainCanvas.style.display = 'block';
                if (backgroundVideo && !backgroundVideo.ended) {
                    // Reset video về đầu để đảm bảo bắt đầu từ đầu khi xoay ngang
                    backgroundVideo.currentTime = 0;
                    backgroundVideo.style.display = 'block';
                    backgroundVideo.style.visibility = 'visible';
                    backgroundVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                }
                // Phát nhạc nếu có
                const christmasAudio = document.getElementById('christmasAudio');
                if (christmasAudio) {
                    christmasAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
                }
                // Khởi động website
                startWebsite();
            }
        } else {
            // RESET TẤT CẢ khi xoay về portrait
            // Ẩn button phát nhạc TRƯỚC khi hiển thị orientation lock
            if (musicControl) {
                musicControl.style.display = 'none';
            }
            
            // Đảm bảo hiển thị overlay khi xoay về portrait
            if (orientationLock) {
                orientationLock.style.display = 'flex';
                orientationLock.style.visibility = 'visible';
                orientationLock.style.opacity = '1';
            }
            mainCanvas.style.display = 'none';
            
            // Dừng và reset video
            if (backgroundVideo) {
                backgroundVideo.style.display = 'none';
                backgroundVideo.pause();
                backgroundVideo.currentTime = 0; // Reset về đầu
            }
            
            // Dừng nhạc
            const christmasAudio = document.getElementById('christmasAudio');
            if (christmasAudio) {
                christmasAudio.pause();
                christmasAudio.currentTime = 0; // Reset về đầu
            }
            
            // Dừng website và reset hiệu ứng
            stopWebsite();
            
            // Reset canvas nếu có
            if (S && S.Shape && S.Shape.clear) {
                S.Shape.clear();
            }
            const canvas = document.querySelector('.canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        mediaQuery.addEventListener('change', (e) => {
            isLandscape = e.matches;
            if (isLandscape) {
                orientationLock.style.display = 'none';
                // Chỉ phát video và hiệu ứng nếu đã click "Bắt đầu"
                if (hasStarted) {
                    // Hiển thị lại button phát nhạc khi đã xoay ngang
                    if (musicControl) {
                        musicControl.style.display = 'block';
                    }
                    // Phát video và hiệu ứng khi xoay ngang
                    mainCanvas.style.display = 'block';
                    // CHỈ play lại nếu video chưa kết thúc
                    if (backgroundVideo && !backgroundVideo.ended) {
                        // Reset video về đầu để đảm bảo bắt đầu từ đầu khi xoay ngang
                        backgroundVideo.currentTime = 0;
                        backgroundVideo.style.display = 'block';
                        backgroundVideo.style.visibility = 'visible';
                        backgroundVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                    }
                    // Phát nhạc nếu có
                    const christmasAudio = document.getElementById('christmasAudio');
                    if (christmasAudio) {
                        christmasAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
                    }
                    // Khởi động website
                    startWebsite();
                }
            } else {
                // RESET TẤT CẢ khi xoay về portrait
                // Ẩn button phát nhạc TRƯỚC khi hiển thị orientation lock
                if (musicControl) {
                    musicControl.style.display = 'none';
                }
                
                // Đảm bảo hiển thị overlay khi xoay về portrait
                if (orientationLock) {
                    orientationLock.style.display = 'flex';
                    orientationLock.style.visibility = 'visible';
                    orientationLock.style.opacity = '1';
                }
                mainCanvas.style.display = 'none';
                
                // Dừng và reset video
                if (backgroundVideo) {
                    backgroundVideo.style.display = 'none';
                    backgroundVideo.pause();
                    backgroundVideo.currentTime = 0; // Reset về đầu
                }
                
                // Dừng nhạc
                const christmasAudio = document.getElementById('christmasAudio');
                if (christmasAudio) {
                    christmasAudio.pause();
                    christmasAudio.currentTime = 0; // Reset về đầu
                }
                
                // Dừng website và reset hiệu ứng
                stopWebsite();
                
                // Reset canvas nếu có
                if (S && S.Shape && S.Shape.clear) {
                    S.Shape.clear();
                }
                const canvas = document.querySelector('.canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        });
    }
}
function startWebsite() {
    // Kiểm tra canvas có tồn tại trước khi khởi động
    const canvas = document.querySelector('.canvas');
    if (!canvas) {
        console.warn('Canvas not found, cannot start website');
        return;
    }
    S.init(); // luôn chạy lại hiệu ứng
    S.initialized = true;
}

function stopWebsite() {
    // Website stopped
}

S = {
    initialized: false,
    init: function () {
        if (!isLandscape && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return;
        }
        var action = window.location.href,
            i = action.indexOf('?websiteId=');

        if (i !== -1) {
         
        } else {
            // ✅ Kích hoạt hiệu ứng ghép chữ với 3 từ: MERRY, CHRISTMAS, 2025
            // ⭐ DELAY 1 giây trước khi chạy hiệu ứng ghép chữ khi vào web
            const sequence = "MERRY|CHRISTMAS|2025";
            setTimeout(function() {
                S.UI.simulate(sequence);
            }, 500); // Delay 0.5 giây (500ms)
        }

        S.Drawing.init('.canvas');
        document.body.classList.add('body--ready');

        S.Drawing.loop(function () {
            S.Shape.render();
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Preload ảnh background cho gift page
    const bgImage = new Image();
    bgImage.src = 'assets/images/background1.jpg';
    
    // Đảm bảo video background phát ngay khi load
    const backgroundVideo = document.getElementById('backgroundVideo');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Ẩn nút phát nhạc ngay từ đầu nếu là mobile (sẽ hiển thị khi xoay ngang)
    const musicControl = document.getElementById('musicControl');
    if (isMobile && musicControl) {
        musicControl.style.display = 'none';
    }
    
    if (backgroundVideo) {
        // Đảm bảo video KHÔNG loop
        backgroundVideo.loop = false;
        
        // Chặn context menu và long press trên video
        backgroundVideo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, false);
        
        // Chặn long press trên mobile
        let touchStartTime = 0;
        backgroundVideo.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
        }, { passive: true });
        
        backgroundVideo.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration > 500) { // Long press > 500ms
                e.preventDefault();
                return false;
            }
        }, { passive: false });
        
        // Chặn select và callout
        backgroundVideo.style.webkitUserSelect = 'none';
        backgroundVideo.style.userSelect = 'none';
        backgroundVideo.style.webkitTouchCallout = 'none';
        
        // Preload video ngay từ đầu
        // (preload="auto" đã được set trong HTML)
        // readyState: 0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA
        // Load video ngay để đảm bảo sẵn sàng
        if (backgroundVideo.readyState < 2) {
            backgroundVideo.load();
        }
        
        // Đảm bảo video load đầy đủ
        // Thêm event listener để đảm bảo video đã load đủ data
        const ensureVideoLoaded = () => {
            if (backgroundVideo.readyState >= 3) {
                // Video đã có đủ data để phát
            }
        };
        
        if (backgroundVideo.readyState >= 3) {
            ensureVideoLoaded();
        } else {
            backgroundVideo.addEventListener('canplay', ensureVideoLoaded, { once: true });
            backgroundVideo.addEventListener('loadeddata', ensureVideoLoaded, { once: true });
        }
        
        // Video sẽ được phát trong checkOrientation() khi đã xoay ngang (mobile) hoặc ngay (desktop)

        // Flag để track xem video đã kết thúc chưa
        let videoHasEnded = false;

        // Function để xử lý pause event - chỉ play lại nếu video chưa kết thúc
        function handleVideoPause() {
            // KHÔNG play lại nếu video đã kết thúc
            if (videoHasEnded || backgroundVideo.ended) {
                return;
            }
            // KHÔNG play lại nếu đang ở portrait mode (overlay đang hiển thị)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                const mediaQuery = window.matchMedia("(orientation: landscape)");
                if (!mediaQuery.matches) {
                    return; // Đang ở portrait, không play
                }
            }
            // Chỉ play lại nếu không phải do user pause và video chưa kết thúc
            if (document.visibilityState === 'visible' && backgroundVideo.currentTime < backgroundVideo.duration - 0.5) {
                setTimeout(() => {
                    if (!videoHasEnded && !backgroundVideo.ended) {
                        backgroundVideo.play().catch(() => {});
                    }
                }, 100);
            }
        }

        // Tự động play lại nếu video bị pause (do performance issue) - CHỈ khi video chưa kết thúc
        backgroundVideo.addEventListener('pause', handleVideoPause);

        // Đảm bảo video không bị pause khi render nhiều dots - CHỈ khi video chưa kết thúc
        let videoCheckInterval = setInterval(() => {
            // KHÔNG play lại nếu video đã kết thúc
            if (videoHasEnded || backgroundVideo.ended) {
                clearInterval(videoCheckInterval);
                return;
            }
            // KHÔNG play lại nếu đang ở portrait mode (overlay đang hiển thị)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                const mediaQuery = window.matchMedia("(orientation: landscape)");
                if (!mediaQuery.matches) {
                    return; // Đang ở portrait, không play
                }
            }
            // Chỉ play lại nếu video chưa kết thúc
            if (backgroundVideo.paused && document.visibilityState === 'visible' && backgroundVideo.currentTime < backgroundVideo.duration - 0.5) {
                backgroundVideo.play().catch(() => {});
            }
        }, 500);

        // Khi video kết thúc, đảm bảo nó dừng lại và KHÔNG BAO GIỜ play lại
        backgroundVideo.addEventListener('ended', () => {
            videoHasEnded = true; // Đánh dấu video đã kết thúc
            clearInterval(videoCheckInterval);
            // Đảm bảo video dừng lại và KHÔNG loop
            backgroundVideo.pause();
            backgroundVideo.loop = false; // Đảm bảo không loop
            // Xóa event listener pause để không tự động play lại
            backgroundVideo.removeEventListener('pause', handleVideoPause);
        });
    }
    checkOrientation();
    
    // Setup Start Button
    const startButton = document.getElementById('start-button');
    const startOverlay = document.getElementById('start-overlay');
    
    if (startButton && startOverlay) {
        startButton.addEventListener('click', function() {
            // Đánh dấu đã bắt đầu
            hasStarted = true;
            
            // Ẩn overlay với animation
            startOverlay.classList.add('hidden');
            
            // Sau khi fade out, ẩn hoàn toàn
            setTimeout(() => {
                startOverlay.style.display = 'none';
            }, 500);
            
            // Kiểm tra lại orientation và hiển thị nội dung phù hợp
            // Đối với mobile, cần check orientation trước
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobileDevice) {
                // Mobile: check orientation
                const mediaQuery = window.matchMedia("(orientation: landscape)");
                isLandscape = mediaQuery.matches;
                
                if (isLandscape) {
                    // Đã xoay ngang, hiển thị tất cả
                    const backgroundVideo = document.getElementById('backgroundVideo');
                    const mainCanvas = document.querySelector('.canvas');
                    const musicControl = document.getElementById('musicControl');
                    const orientationLock = document.getElementById('orientation-lock');
                    
                    if (orientationLock) {
                        orientationLock.style.display = 'none';
                    }
                    
                    if (mainCanvas) {
                        mainCanvas.style.display = 'block';
                    }
                    
                    if (backgroundVideo) {
                        backgroundVideo.style.display = 'block';
                        backgroundVideo.style.visibility = 'visible';
                        backgroundVideo.currentTime = 0;
                        backgroundVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                    }
                    
                    if (musicControl) {
                        musicControl.style.display = 'block';
                    }
                    
                    // Phát nhạc (user interaction sẽ unlock audio)
                    const christmasAudio = document.getElementById('christmasAudio');
                    if (christmasAudio) {
                        christmasAudio.play().catch(e => {
                            console.log('Audio autoplay prevented:', e);
                        });
                    }
                    
                    // Khởi động website
                    startWebsite();
                } else {
                    // Chưa xoay ngang, hiển thị orientation lock
                    const orientationLock = document.getElementById('orientation-lock');
                    if (orientationLock) {
                        orientationLock.style.display = 'flex';
                    }
                }
            } else {
                // Desktop: hiển thị tất cả ngay
                const backgroundVideo = document.getElementById('backgroundVideo');
                const mainCanvas = document.querySelector('.canvas');
                const musicControl = document.getElementById('musicControl');
                
                if (mainCanvas) {
                    mainCanvas.style.display = 'block';
                }
                
                if (backgroundVideo) {
                    backgroundVideo.style.display = 'block';
                    backgroundVideo.style.visibility = 'visible';
                    // Phát video
                    backgroundVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                }
                
                if (musicControl) {
                    musicControl.style.display = 'block';
                }
                
                // Phát nhạc (user interaction sẽ unlock audio)
                const christmasAudio = document.getElementById('christmasAudio');
                if (christmasAudio) {
                    christmasAudio.play().catch(e => {
                        console.log('Audio autoplay prevented:', e);
                    });
                }
                
                // Khởi động website
                startWebsite();
            }
        });
    }
});

S.Drawing = (function () {
    var canvas,
        context,
        renderFn,
        requestFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

    return {
        init: function (el) {
            canvas = document.querySelector(el);
            if (!canvas) {
                console.warn('Canvas element not found:', el);
                return;
            }
            context = canvas.getContext('2d');
            if (!context) {
                console.warn('Could not get 2d context from canvas');
                return;
            }
            this.adjustCanvas();
            window.addEventListener('resize', function () {
                S.Drawing.adjustCanvas();
            });
        },

        loop: function (fn) {
            // Dừng loop nếu canvas không tồn tại
            if (!canvas || !context) {
                return;
            }
            renderFn = !renderFn ? fn : renderFn;
            this.clearFrame();
            renderFn();
            requestFrame.call(window, this.loop.bind(this));
        },

        adjustCanvas: function () {
            if (!canvas) {
                return;
            }
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },

        clearFrame: function () {
            if (!canvas || !context) {
                return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        getArea: function () {
            // ✅ Kiểm tra canvas trước khi truy cập
            if (!canvas) {
                console.warn('Canvas not initialized, returning default area');
                return { w: window.innerWidth || 800, h: window.innerHeight || 600 };
            }
            return { w: canvas.width, h: canvas.height };
        },
        drawCircle: function (p, c) {
            // ⭐ TỐI ƯU: Loại bỏ gradient để giảm lag, chỉ dùng màu đơn giản
            // Dùng màu trực tiếp từ Color object với opacity
            c.a = p.a; // Cập nhật opacity
            context.fillStyle = c.render();
            
            context.beginPath();
            context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
    };
}());

S.UI = (function () {
    var canvas = document.querySelector('.canvas'),
        interval,
        currentAction,
        maxShapeSize = 30,
        sequence = [],
        cmd = '#';

    function getAction(value) {
        value = value && value.split(' ')[0];
        return value && value[0] === cmd && value.substring(1);
    }

    function timedAction(fn, delay, max, reverse) {
        clearInterval(interval);
        currentAction = reverse ? max : 1;
        fn(currentAction);

        if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
            interval = setInterval(function () {
                currentAction = reverse ? currentAction - 1 : currentAction + 1;
                fn(currentAction);
                if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
                    clearInterval(interval);
                }
            }, delay);
        }
    }

    function performAction(value) {
        var action,
            current;

        sequence = typeof (value) === 'object' ? value : sequence.concat(value.split('|'));

        function getDynamicDelay(str) {
            // ⭐ ĐIỀU CHỈNH THỜI GIAN HIỂN THỊ CHỮ SAU KHI GHÉP XONG Ở ĐÂY:
            // Đã tăng thêm 500ms so với ban đầu (từ 1700/1900 → 2200/2400)
            const base = isMobile ? 2200 : 2400; // Giảm đi 0.5 giây (từ 2700/2900)
            if (!str || typeof str !== 'string') return base;
            // Nếu là lệnh (bắt đầu bằng #), không cộng thêm thời gian
            if (str.trim().startsWith('#')) return base;
            const extra = Math.max(0, (str.length - 5) * 100);
            return base + extra;
        }

        const totalItems = sequence.length;
        let currentIndex = 0;
        let totalDelay = 0;

        // Tính tổng thời gian của tất cả các chữ
        sequence.forEach((item, idx) => {
            totalDelay += getDynamicDelay(item);
        });

        timedAction(function (index) {
            current = sequence.shift();
            action = getAction(current);
            currentIndex++;

            // Tính delay động cho từng action
            const actionDelay = getDynamicDelay(current);

            switch (action) {
                case 'gift':
                    // Gift case - no additional effects
                    break;

                default:
                    S.Shape.switchShape(S.ShapeBuilder.letter(current[0] === cmd ? 'What?' : current));
            }

            // Khi là chữ cuối cùng, đợi nó tan biến rồi mới hiển thị gift card
            if (currentIndex >= totalItems) {
                // Đợi chữ cuối cùng hiển thị
                setTimeout(() => {
                    // Đợi thêm 0.5 giây sau khi ghép xong rồi mới bắt đầu tan biến
                    setTimeout(() => {
                        // Trigger dots tan rã (scatter) ra xa
                        if (S.Shape && S.Shape.fadeOut) {
                            S.Shape.fadeOut();
                        }
                        
                        // Đợi đủ để thấy hiệu ứng tan rã (dots bay ra xa) rồi mới clear
                        setTimeout(() => {
                            // Clear canvas và dots trực tiếp - không dùng switchShape để tránh lag
                            const canvas = document.querySelector('.canvas');
                            if (canvas) {
                                const ctx = canvas.getContext('2d');
                                // Clear canvas
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                            }
                            
                            // Clear dots array trực tiếp - tối ưu hơn switchShape với letter('')
                            if (S.Shape && S.Shape.clear) {
                                S.Shape.clear();
                            }
                            
                            // Tự động chuyển sang màn gift sau khi dots đã tan rã xong
                            loadGiftPage();
                        }, 1000); // Đợi 1.2 giây để thấy được hiệu ứng tan rã rõ ràng hơn
                    }, 500); // Đợi 0.5 giây sau khi ghép xong rồi mới bắt đầu tan biến
                }, actionDelay); // Đợi thời gian hiển thị của chữ "2025"
            }
        }, getDynamicDelay(sequence[0]), sequence.length);
    }

    return {
        simulate: function (action) {
            if (isLandscape || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                performAction(action);
            }
        }
    };
}());

S.Point = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
    this.a = args.a;
    this.h = args.h;
};

S.Color = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

S.Color.prototype = {
    render: function () {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    }
};

// Cập nhật S.Dot với kích thước nhỏ hơn
S.Dot = function (x, y) {
    this.p = new S.Point({
        x: x,
        y: y,
        z: this.getDotSize(),
        a: 1,
        h: 0
    });
    this.e = 0.07;
    this.s = true;
    const currentSettings = window.settings || settings;
    const rgb = hexToRgb(currentSettings.sequenceColor);
    this.c = new S.Color(rgb.r, rgb.g, rgb.b, this.p.a);
    this.t = this.clone();
    this.q = [];
};
S.Dot.prototype = {
    // Thêm method để tính kích thước dot dựa trên thiết bị
    getDotSize: function () {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            return 2; // Dots nhỏ hơn cho mobile
        } else {
            return 4; // Dots vừa phải cho desktop
        }
    },

    clone: function () {
        return new S.Point({
            x: this.x,
            y: this.y,
            z: this.z,
            a: this.a,
            h: this.h
        });
    },

    _draw: function () {
        // Cập nhật màu theo settings hiện tại mỗi khi vẽ
        const currentSettings = window.settings || settings;
        const rgb = hexToRgb(currentSettings.sequenceColor);
        this.c.r = rgb.r;
        this.c.g = rgb.g;
        this.c.b = rgb.b;
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
    },

    _moveTowards: function (n) {
        var details = this.distanceTo(n, true),
            dx = details[0],
            dy = details[1],
            d = details[2],
            e = this.e * d;

        if (this.p.h === -1) {
            this.p.x = n.x;
            this.p.y = n.y;
            return true;
        }

        if (d > 1) {
            this.p.x -= ((dx / d) * e);
            this.p.y -= ((dy / d) * e);
        } else {
            if (this.p.h > 0) {
                this.p.h--;
            } else {
                return true;
            }
        }

        return false;
    },

    _update: function () {
        if (this._moveTowards(this.t)) {
            var p = this.q.shift();
            if (p) {
                this.t.x = p.x || this.p.x;
                this.t.y = p.y || this.p.y;
                this.t.z = p.z || this.p.z;
                this.t.a = p.a || this.p.a;
                this.p.h = p.h || 0;
            } else {
                if (!this.s) {
                    this.move(new S.Point({
                        x: this.p.x + (Math.random() * 50) - 25,
                        y: this.p.y + (Math.random() * 50) - 25,
                    }));
                }
            }
        }
        d = this.p.a - this.t.a;
        // ⭐ ĐIỀU CHỈNH ĐỘ SÁNG DOT Ở ĐÂY (khi đã ghép xong chữ):
        // Cho phép opacity giảm xuống 0 để dots có thể tan biến
        // Nếu target opacity = 0 (đang fade out), giảm với tốc độ vừa phải để thấy rõ hiệu ứng
        const fadeSpeed = this.t.a === 0 ? 0.06 : 0.05; // Tan biến với tốc độ vừa phải
        this.p.a = Math.max(0, this.p.a - (d * fadeSpeed));
        d = this.p.z - this.t.z;
        const sizeFadeSpeed = this.t.z === 0 ? 0.06 : 0.05; // Size cũng giảm với tốc độ vừa phải
        this.p.z = Math.max(0, this.p.z - (d * sizeFadeSpeed));
    },

    distanceTo: function (n, details) {
        var dx = this.p.x - n.x,
            dy = this.p.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);
        return details ? [dx, dy, d] : d;
    },

    move: function (p, avoidStatic) {
        if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
            this.q.push(p);
        }
    },

    render: function () {
        this._update();
        this._draw();
    }
};

S.ShapeBuilder = (function () {
    var shapeCanvas = document.createElement('canvas'),
        shapeContext = shapeCanvas.getContext('2d', { willReadFrequently: true }),
        fontSize = 500,
        fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';
    //    fontFamily = 'Pacifico, Arial, sans-serif';

    // Điều chỉnh gap dựa trên thiết bị
    function getGap() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            return 4; // Gap nhỏ hơn cho mobile = dots dày đặc hơn
        } else {
            return 8; // Gap vừa phải cho desktop
        }
    }

    function fit() {
        const gap = getGap();
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
    }

    function processCanvas() {
        const gap = getGap();
        var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data,
            dots = [],
            x = 0,
            y = 0,
            fx = shapeCanvas.width,
            fy = shapeCanvas.height,
            w = 0,
            h = 0;

        // Sử dụng gap động để tạo nhiều dots hơn
        for (var p = 0; p < pixels.length; p += (4 * gap)) {
            if (pixels[p + 3] > 0) {
                dots.push(new S.Point({
                    x: x,
                    y: y
                }));

                w = x > w ? x : w;
                h = y > h ? y : h;
                fx = x < fx ? x : fx;
                fy = y < fy ? y : fy;
            }
            x += gap;
            if (x >= shapeCanvas.width) {
                x = 0;
                y += gap;
                p += gap * 4 * shapeCanvas.width;
            }
        }
        return { dots: dots, w: w + fx, h: h + fy };
    }

    function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function init() {
        fit();
        window.addEventListener('resize', fit);
    }

    init();

    return {
        letter: function (l) {
            var s = 0;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 768;
            const baseFontSize = (isMobile || isSmallScreen) ? 182 : 352; // Tăng font size

            setFontSize(baseFontSize);
            s = Math.min(baseFontSize,
                (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * baseFontSize,
                (shapeCanvas.height / baseFontSize) * (isNumber(l) ? 0.8 : 0.35) * baseFontSize); // Giảm tỷ lệ cho mobile

            setFontSize(s);
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);
            return processCanvas();
        }
    };
}());

// Cập nhật S.Shape với logic tạo dots tối ưu
S.Shape = (function () {
    var dots = [],
        width = 0,
        height = 0,
        cx = 0,
        cy = 0;

    function compensate() {
        var a = S.Drawing.getArea();
        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
    }

    function getDotCreationParams() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth < 768;

        if (isMobile || isSmallScreen) {
            return {
                minSize: 1,      // Giảm từ 2 xuống 1
                maxSize: 4,      // Giảm từ 8 xuống 4
                minZ: 2,         // Giảm từ 3 xuống 2
                maxZ: 3          // Giảm từ 6 xuống 3
            };
        } else {
            return {
                minSize: 3,
                maxSize: 12,
                minZ: 4,
                maxZ: 8
            };
        }
    }

    return {
        switchShape: function (n, fast) {
            var size,
                a = S.Drawing.getArea();
            width = n.w;
            height = n.h;
            compensate();

            const params = getDotCreationParams();

            if (n.dots.length > dots.length) {
                size = n.dots.length - dots.length;
                for (var d = 1; d <= size; d++) {
                    dots.push(new S.Dot(a.w / 2, a.h / 2));
                }
            }

            var d = 0,
                i = 0;
            while (n.dots.length > 0) {
                i = Math.floor(Math.random() * n.dots.length);
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                dots[d].e = isMobile ? 0.35 : 0.11; // Tăng tốc độ di chuyển cho mobile

                if (dots[d].s) {
                    dots[d].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random(),
                        h: 18
                    }));
                } else {
                    dots[d].move(new S.Point({
                        z: Math.random() * (params.minZ) + params.minZ,
                        h: fast ? 18 : 30
                    }));
                }

                dots[d].s = true;
                dots[d].move(new S.Point({
                    x: n.dots[i].x + cx,
                    y: n.dots[i].y + cy,
                    a: 1,
                    z: params.minZ,
                    h: 0
                }));

                n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                d++;
            }

            for (var i = d; i < dots.length; i++) {
                if (dots[i].s) {
                    dots[i].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random() * 0.25 + 0.75, // Opacity từ 0.75-1.0 để luôn sáng
                        h: 20
                    }));
                    dots[i].s = false;
                    dots[i].e = 0.04;
                    dots[i].move(new S.Point({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h,
                        // ⭐ ĐIỀU CHỈNH ĐỘ SÁNG DOT KHI RỜI ĐI (khi đã ghép xong chữ):
                        // Thay đổi giá trị 0.75 (0.0-1.0): 0.0 = mờ nhất, 1.0 = sáng nhất
                        a: 1, // Opacity khi dots ổn định sau khi ghép chữ
                        z: Math.random() * params.minZ,
                        h: 0
                    }));
                }
            }
        },

        render: function () {
            for (var d = 0; d < dots.length; d++) {
                dots[d].render();
            }
        },

        clear: function () {
            // Clear dots array trực tiếp - tối ưu hơn switchShape
            dots.length = 0;
            width = 0;
            height = 0;
            cx = 0;
            cy = 0;
        },

        fadeOut: function () {
            // Trigger dots tan rã ra xa (scatter) với tốc độ nhanh
            const a = S.Drawing.getArea();
            for (var i = 0; i < dots.length; i++) {
                if (dots[i]) {
                    // Tính toán vị trí ngẫu nhiên xa hơn để tạo hiệu ứng tan rã
                    const centerX = a.w / 2;
                    const centerY = a.h / 2;
                    const angle = Math.random() * Math.PI * 2; // Góc ngẫu nhiên
                    const distance = Math.max(a.w, a.h) * (0.5 + Math.random() * 0.5); // Khoảng cách xa
                    const targetX = centerX + Math.cos(angle) * distance;
                    const targetY = centerY + Math.sin(angle) * distance;
                    
                    // Di chuyển dots ra xa (tan rã) và giảm opacity dần
                    dots[i].move(new S.Point({
                        x: targetX,
                        y: targetY,
                        a: 0, // Opacity = 0 để tan biến
                        z: 0,
                        h: 0
                    }));
                    // Tốc độ di chuyển vừa phải để thấy rõ hiệu ứng tan rã
                    dots[i].e = 0.1; // Tốc độ vừa phải để thấy được hiệu ứng tan rã
                }
            }
        }
    };
}());


// 5. Tối ưu hóa hiệu ứng mở sách
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 211, g: 155, b: 155 };
}












const musicControl = document.getElementById('musicControl');
const christmasAudio = document.getElementById('christmasAudio');
let isPlaying = false;

christmasAudio.volume = 0.6;

// Function để cập nhật icon khi audio phát
function updateMusicIcon() {
    if (!musicControl) return;
    
    if (!christmasAudio.paused) {
        // Đang phát - đổi icon thành pause icon
        musicControl.innerHTML = '⏸';
        musicControl.classList.add('playing');
        musicControl.title = 'Pause Music';
        isPlaying = true;
    } else {
        // Đã dừng - đổi icon về play icon
        musicControl.innerHTML = '▶';
        musicControl.classList.remove('playing');
        musicControl.title = 'Play Music';
        isPlaying = false;
    }
}

function toggleMusic() {
    if (isPlaying) {
        christmasAudio.pause();
    } else {
        christmasAudio.play().catch(error => {
            // alert('Click to play music!');
        });
    }
}

musicControl.addEventListener('click', toggleMusic);

// Tự động cập nhật icon khi audio phát (tự động hoặc do user click)
christmasAudio.addEventListener('play', () => {
    updateMusicIcon();
});

// Tự động cập nhật icon khi audio pause
christmasAudio.addEventListener('pause', () => {
    updateMusicIcon();
});

christmasAudio.addEventListener('ended', () => {
});

christmasAudio.addEventListener('error', (e) => {
    musicControl.style.display = 'none';
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        christmasAudio.pause();
    }
});


// Function để request fullscreen (lấy từ final_gift.html)
function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}


// Function để load giao diện nhận quà
function loadGiftPage() {
    // Lưu reference của audio element (không chỉ thông tin) để giữ nguyên, không bị khựng
    const christmasAudio = document.getElementById('christmasAudio');
    let audioElement = null;
    let audioWasPlaying = false;
    
    if (christmasAudio) {
        // Lưu reference của element thật, không chỉ thông tin
        audioElement = christmasAudio;
        audioWasPlaying = !christmasAudio.paused;
        
        // Tạm thời move audio ra khỏi body để không bị xóa khi thay thế innerHTML
        document.documentElement.appendChild(audioElement);
    }
    
    // Tạo overlay transition để fade out mượt mà
    // Đặt ở documentElement để không bị xóa khi thay thế body.innerHTML
    const transitionOverlay = document.createElement('div');
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
        pointer-events: none;
    `;
    document.documentElement.appendChild(transitionOverlay);
    
    // Fade out canvas và video với transition
    const canvas = document.querySelector('.canvas');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const musicControl = document.getElementById('musicControl');
    
    // Thêm transition cho canvas và video
    if (canvas) {
        canvas.style.transition = 'opacity 0.8s ease-in-out';
        canvas.style.opacity = '0';
    }
    
    if (backgroundVideo) {
        backgroundVideo.style.transition = 'opacity 0.8s ease-in-out';
        backgroundVideo.style.opacity = '0';
    }
    
    if (musicControl) {
        musicControl.style.transition = 'opacity 0.8s ease-in-out';
        musicControl.style.opacity = '0';
    }
    
    // Fade in overlay
    setTimeout(() => {
        transitionOverlay.style.opacity = '1';
    }, 50);
    
    // Đợi fade out hoàn tất rồi mới ẩn và load gift page
    setTimeout(() => {
        // Ẩn canvas và các element khác
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Ẩn video background
        if (backgroundVideo) {
            backgroundVideo.style.display = 'none';
        }
        
        // Ẩn music control
        if (musicControl) {
            musicControl.style.display = 'none';
        }
    
    // Load nội dung từ gift.html
    fetch('gift/gift.html')
        .then(response => response.text())
        .then(html => {
            // Parse HTML và lấy phần body
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const giftBody = doc.body;
            
            // Tách script tags ra (vì innerHTML không execute script)
            const scriptTags = giftBody.querySelectorAll('script');
            let bodyHTML = giftBody.innerHTML;
            
            // Xóa script tags khỏi HTML
            scriptTags.forEach(script => {
                bodyHTML = bodyHTML.replace(script.outerHTML, '');
            });
            
            // Xóa tất cả các element cũ trước khi thay thế
            const canvas = document.querySelector('.canvas');
            if (canvas) {
                canvas.remove(); // Xóa hoàn toàn canvas
            }
            
            // Đảm bảo body có pointer-events
            document.body.style.pointerEvents = 'auto';
            document.documentElement.style.pointerEvents = 'auto';
            
            // Thay thế nội dung body hiện tại (không có script tags)
            document.body.innerHTML = bodyHTML;
            
            // Khôi phục audio element (dùng lại element cũ, không tạo mới - không bị khựng)
            if (audioElement) {
                // Đảm bảo loop = true
                audioElement.loop = true;
                
                // Move audio về lại body
                document.body.appendChild(audioElement);
                
                // Tiếp tục phát nếu đang phát trước đó (audio vẫn đang phát, không cần play lại)
                if (audioWasPlaying && audioElement.paused) {
                    // Nếu bị pause do move element, play lại
                    audioElement.play().catch(err => {
                        console.log('Audio autoplay prevented, will play on user interaction');
                        const playOnInteraction = () => {
                            audioElement.play().catch(() => {});
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('touchstart', playOnInteraction);
                        };
                        document.addEventListener('click', playOnInteraction, { once: true });
                        document.addEventListener('touchstart', playOnInteraction, { once: true });
                    });
                }
                
                console.log('🎵 Audio element preserved (no interruption)');
            }
            
            // Đảm bảo body vẫn có pointer-events sau khi thay thế
            document.body.style.pointerEvents = 'auto';
            
            // Load các script tags đã tách ra
            scriptTags.forEach(scriptTag => {
                if (scriptTag.src) {
                    // External script
                    const newScript = document.createElement('script');
                    newScript.src = scriptTag.src;
                    newScript.type = scriptTag.type || 'text/javascript';
                    newScript.async = scriptTag.async || false;
                    newScript.defer = scriptTag.defer || false;
                    
                    newScript.onerror = function(e) {
                        console.error('Error loading script:', newScript.src, e);
                    };
                    
                    document.body.appendChild(newScript);
                } else if (scriptTag.textContent) {
                    // Inline script - execute trực tiếp
                    try {
                        eval(scriptTag.textContent);
                    } catch (e) {
                        console.error('Error executing inline script:', e);
                    }
                }
            });
            
            // Nếu ảnh đã được preload, sử dụng ảnh đã cache
            const bgImg = document.querySelector('.gift-background');
            if (bgImg && window.giftBackgroundImage && window.giftBackgroundImage.complete) {
                bgImg.src = window.giftBackgroundImage.src;
                // Trigger load event để đảm bảo ảnh hiển thị ngay
                bgImg.onload = function() {
                    this.style.opacity = '1';
                };
                bgImg.style.opacity = '0';
                bgImg.style.transition = 'opacity 0.1s';
                setTimeout(() => {
                    if (bgImg) bgImg.style.opacity = '1';
                }, 10);
            }
            
            // Load CSS và JS của gift page
            if (!document.querySelector('link[href="gift/gift.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'gift/gift.css';
                document.head.appendChild(link);
            }
            
            // Load gift.js với error handling và onload
            // Đợi một chút để đảm bảo DOM đã render xong
            setTimeout(() => {
                if (!document.querySelector('script[src*="gift.js"]')) {
                    const script = document.createElement('script');
                    script.src = 'gift/gift.js';
                    script.type = 'text/javascript';
                    
                    // Thêm onerror để bắt lỗi
                    script.onerror = function(e) {
                        console.error('Error loading gift.js:', e);
                        // Thử load lại với đường dẫn khác
                        const retryScript = document.createElement('script');
                        retryScript.src = './gift/gift.js';
                        retryScript.type = 'text/javascript';
                        retryScript.onerror = function() {
                            // Thử cách cuối: fetch và eval
                            fetch('gift/gift.js')
                                .then(response => response.text())
                                .then(code => {
                                    eval(code);
                                })
                                .catch(err => {
                                    console.error('Error fetching gift.js:', err);
                                });
                        };
                        document.body.appendChild(retryScript);
                    };
                    
                    // Append script vào body
                    document.body.appendChild(script);
                    console.log('📦 Đang load gift.js từ:', script.src);
                } else {
                    console.log('⚠️ gift.js đã tồn tại, không load lại');
                }
            }, 100); // Đợi 100ms để DOM render xong
            
            // Đảm bảo settings được giữ lại
            if (window.settings) {
                // Settings đã có sẵn
            }
            
            // Fade in gift page sau khi load xong
            setTimeout(() => {
                // Đảm bảo body có opacity ban đầu = 0
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.8s ease-in-out';
                
                // Trigger reflow để đảm bảo transition hoạt động
                void document.body.offsetHeight;
                
                // Fade in body
                setTimeout(() => {
                    document.body.style.opacity = '1';
                    
                    // Fade out overlay sau khi body đã fade in
                    setTimeout(() => {
                        transitionOverlay.style.opacity = '0';
                        setTimeout(() => {
                            if (transitionOverlay.parentNode) {
                                transitionOverlay.remove();
                            }
                        }, 800);
                    }, 300);
                }, 50);
            }, 100);
        })
        .catch(error => {
            console.error('Error loading gift page:', error);
            alert('Không thể tải trang nhận quà. Vui lòng thử lại!');
            // Xóa overlay nếu có lỗi
            if (transitionOverlay.parentNode) {
                transitionOverlay.remove();
            }
        });
    }, 800); // Đợi 800ms để fade out hoàn tất
}


