// Đợi cho toàn bộ nội dung trang web được tải xong rồi mới chạy JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // --- BÀI 3.1: THƯ VIỆN ẢNH ĐƠN GIẢN ---
    // Yêu cầu: Click vào ảnh thumbnail thì ảnh lớn thay đổi theo.

    // 1. Lấy ra các phần tử cần thiết từ HTML
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');

    // 2. Lặp qua từng ảnh thumbnail và gắn sự kiện 'click'
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Khi một thumbnail được click:
            
            // a. Cập nhật ảnh lớn: Lấy đường dẫn (src) của thumbnail được click
            // và gán nó cho ảnh lớn.
            mainImage.src = this.src;

            // b. Cập nhật trạng thái 'active' (viền xanh):
            // Đầu tiên, xóa class 'active' khỏi tất cả các thumbnail.
            thumbnails.forEach(innerThumb => {
                innerThumb.classList.remove('active');
            });
            // Sau đó, thêm class 'active' chỉ cho thumbnail vừa được click.
            this.classList.add('active');
        });
    });


    // --- BÀI 3.2: SCROLL EFFECT CHO HEADER ---
    // Yêu cầu: Khi cuộn trang, thêm class 'scrolled' vào header.

    const header = document.querySelector('header');
    
    // Gắn sự kiện 'scroll' vào cửa sổ trình duyệt
    window.addEventListener('scroll', function() {
        // Kiểm tra xem vị trí cuộn theo chiều dọc (window.scrollY) có lớn hơn 50px không.
        if (window.scrollY > 50) {
            // Nếu có, thêm class 'scrolled' vào header.
            header.classList.add('scrolled');
        } else {
            // Nếu không (khi cuộn lên lại đầu trang), xóa class 'scrolled' đi.
            header.classList.remove('scrolled');
        }
    });


    // --- BÀI 3.3: HIỆU ỨNG ANIMATION KHI CUỘN TỚI (Intersection Observer) ---
    // Yêu cầu: Các thẻ tính năng (feature-item) sẽ mờ dần và trượt lên khi xuất hiện.

    // 1. Lấy ra tất cả các thẻ tính năng
    const featureItems = document.querySelectorAll('.feature-item');
    
    // 2. Cài đặt cho Observer
    const observerOptions = {
        root: null, // quan sát so với viewport
        threshold: 0.1 // Kích hoạt khi 10% của phần tử hiện ra
    };

    // 3. Tạo một "người quan sát" mới
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Nếu phần tử đi vào trong viewport (isIntersecting)
            if (entry.isIntersecting) {
                // Thêm class 'visible' để kích hoạt animation trong CSS
                entry.target.classList.add('visible');
                // Ngừng quan sát phần tử này để hiệu ứng không lặp lại
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Bắt đầu quan sát từng thẻ tính năng
    featureItems.forEach(item => {
        observer.observe(item);
    });

});