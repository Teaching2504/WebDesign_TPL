# WebDesign_TPL
The 2026 Web Design Contest Submission by TPL Team

## Tổng quan dự án

**WebDesign_TPL** là sản phẩm của đội **TPL** tham gia cuộc thi **Web Design 2026**, với chủ đề **"Làm đẹp & Phong cách sống"**.

Dự án là một landing page áp dụng cơ chế **White Label**: chỉ với **một bộ mã nguồn** (HTML, CSS, JavaScript thuần) và **các file cấu hình JSON**, trang web có thể chuyển sang thương hiệu khác về tên, logo, màu sắc, nội dung, sản phẩm và thông tin liên hệ mà **không cần sửa mã nguồn**.

Ba thương hiệu giả tưởng do đội tự đặt (không dùng thương hiệu có thật):

| Brand  | Thương hiệu | Lĩnh vực | File cấu hình |
| ---  | --- | --- | --- |
| brand 1  | **TPL - The Pretty Life** | Chăm sóc tóc | `config/site.config.json` |
| brand 2  | **Punévie** | Skincare, chăm sóc da mặt | `config/punevie.config.json` |
| brand 3  | **L'Cale Perfume** | Nước hoa và phong cách sống | `config/lcale.config.json` |

### Đáp ứng

- Giao diện hiện đại, responsive, tương thích nhiều thiết bị (điện thoại, máy tính bảng, máy tính).
- Dễ tùy chỉnh, dễ mở rộng thêm thương hiệu mới.
- Hỗ trợ **2 ngôn ngữ** (Tiếng Việt / English) và **chế độ Sáng / Tối**.
- Chỉ dùng **HTML, CSS, JavaScript thuần**, không dùng framework, không dùng bộ giao diện có sẵn, không cần build, không có backend.

## Thông tin về nhóm

**Tên nhóm:** TPL

| Thành viên | Vai trò |
| --- | --- |
| Nguyễn Thị Tuyết Trinh | Trưởng nhóm, quản lý dự án/ Code chính HTML, CSS, JS/ Code JSON brand 1 (TPL) |
|Dương Lê Kim Phụng | Lên ý tưởng và code JSON brand 2 (Punévie)/ Chỉnh sửa, bổ sung HTML, CSS, JS |
| Lê Thị Cẩm Lệ | Lên ý tưởng và code JSON brand 3 (L'Cale Perfume) |

Liên hệ trưởng nhóm: 2351010216trinh@ou.edu.vn

## Cấu trúc thư mục

```
WebDesign_TPL/
├─ index.html              # Khung trang (chỉ chứa "ô trống" và các id / data-i18n)
├─ README.md
├─ assets/
│  ├─ brand_1/             # TPL
│  │  ├─ images/           # Ảnh sản phẩm
│  │  └─ logos/            # Logo
│  ├─ brand_2/             # Punévie
│  │  ├─ images/
│  │  └─ logos/
│  └─ brand_3/             # L'Cale Perfume
│     ├─ images/
│     └─ logos/
├─ config/
│  ├─ site.config.json     # Cấu hình TPL (brand 1, bản mặc định)
│  ├─ punevie.config.json  # Cấu hình Punévie (brand 2)
│  └─ lcale.config.json    # Cấu hình L'Cale Perfume (brand 3)
├─ css/
│  ├─ reset.css            # Đặt lại style mặc định của trình duyệt
│  ├─ style.css            # Giao diện chính, dùng biến CSS
│  └─ responsive.css       # Tùy chỉnh cho màn hình nhỏ
└─ js/
   └─ app.js               # Đọc file config và đổ nội dung vào trang
```
## Giới thiệu về White Label của dự án
Trong dự án này, white label được hiểu là khả năng dùng chung một mã nguồn cho nhiều thương hiệu. Muốn đổi thương hiệu chỉ cần đổi file cấu hình, không cần sửa cấu trúc cơ bản của trang. Cách áp dụng:

**1. Tách phần giao diện và nội dung riêng biệt**

- Giao diện (bố cục, màu sắc, font) nằm ở `css/`.
- Nội dung (tên, logo, chữ, sản phẩm, liên hệ) nằm ở các file `config/*.json`.
- `index.html` chỉ là khung với các "ô trống", `js/app.js` đọc file config rồi điền nội dung vào.

**2. Sử dụng biến / cấu hình để thay đổi branding**

- File JSON chứa: tên thương hiệu, logo, bảng màu, chữ tiếng Việt và tiếng Anh, danh sách sản phẩm, thông tin liên hệ.
- `app.js` gán màu trong JSON vào các biến CSS (`--primary-color`, `--bg-color`...), nên đổi màu ở JSON là toàn trang đổi theo.

**3. Tách thư mục assets linh hoạt**

- Logo và ảnh của mỗi brand nằm ở thư mục riêng (`assets/brand_1`, `brand_2`, `brand_3`), dễ thay thế.

**4. Xây dựng layout theo từng khối**

- Trang chia thành các khối: header, hero, câu chuyện, sản phẩm, trước/sau, footer.
- Chữ trong mỗi khối được gắn nhãn `data-i18n`, `app.js` tìm đúng nhãn trong file JSON để điền vào. Danh sách sản phẩm tự được tạo từ file JSON nên thêm, bớt sản phẩm không cần sửa HTML.

**5. Hướng dẫn người triển khai**

- Chạy trang bằng Live Server của VS Code (không mở file HTML bằng cách nhấp đúp vì trình duyệt sẽ chặn đọc file JSON).
- Muốn thêm thương hiệu mới: tạo thư mục ảnh trong `assets/`, sao chép một file config và sửa nội dung, rồi thêm một dòng `<option>` vào danh sách chọn trong `index.html`.
- Không cần sửa `css/` và `js/app.js` khi đổi thương hiệu.

**6. Kiểm thử & đảm bảo chất lượng sau khi thay branding**

- Kiểm tra hiển thị trên mobile, tablet, desktop.
- Kiểm tra các tương tác: menu, đổi ngôn ngữ, chế độ Sáng / Tối, cửa sổ chi tiết sản phẩm.
- Thử với số lượng sản phẩm và độ dài chữ khác nhau để bố cục không bị vỡ.

## Diễn giải class cho White Label

**1. Design System**

- `:root`: khai báo biến toàn cục cho màu chủ đạo, màu phụ, màu nhấn, màu nền, màu chữ, màu footer, ảnh nền hero (`--primary-color`, `--secondary-color`, `--third-color`, `--accent-color`, `--bg-color`, `--text-color`, `--footer-color`, `--hero-bg-image`...).
- `data-theme` (light / dark): chuyển chế độ Sáng / Tối.

**2. Global Layout**

- `.container`: khung căn giữa nội dung.
- `.section`, `.section-header`, `.section-title`, `.section-subtitle`: khối nội dung và tiêu đề của từng phần.
- `.demo-switcher-bar`: thanh chọn thương hiệu, ngôn ngữ, chế độ Sáng / Tối.

**3. Header**

- `.header`, `.brand-logo`: đầu trang và logo.
- `.nav-menu`, `.nav-link`, `.nav-toggle-btn`: menu và nút ☰ trên điện thoại.

**4. Hero**

- `.hero-section`, `.hero-wrapper`: phần mở đầu của trang.
- `.hero-badge`, `.hero-title`, `.hero-desc`, `.hero-buttons`: nhãn, tiêu đề, mô tả, các nút.
- `.hero-image-card`: khung ảnh chính.

**5. Câu chuyện thương hiệu**

- `.story-section`, `.story-card`: khối giới thiệu.
- `.story-badge`, `.story-title`, `.story-desc`: nhãn, tiêu đề, mô tả.
- `.story-stats-grid`, `.stat-item`, `.stat-num`, `.stat-text`: 3 con số thống kê.

**6. Sản phẩm**

- `.grid-categories`: lưới chứa các thẻ sản phẩm (do `app.js` tự tạo).
- `.category-card`, `.cat-image`, `.cat-title`, `.cat-desc`, `.cat-action`: từng thẻ sản phẩm.
- `.product-modal`: cửa sổ hiện chi tiết khi bấm "Xem chi tiết".

**7. Trước / Sau**

- `.before-after-section`, `.before-after-grid`: khối so sánh.
- `.ba-card`, `.ba-tag`: 2 thẻ nội dung.

**8. Buttons**

- `.btn`: nút chuẩn.
- `.btn-primary`: nút chính (nền màu chủ đạo).
- `.btn-outline`: nút phụ (chỉ có viền).

**9. Footer**

- `.footer`, `.footer-content`, `.footer-col`: chân trang với tên thương hiệu và thông tin liên hệ.
- `.footer-bottom`: dòng bản quyền.

## Cách áp dụng White Label

- Chỉ sửa khối `theme` trong file config để đổi màu → toàn site thay đổi.
- Thay logo, ảnh trong `assets/` và cập nhật đường dẫn trong file config → đổi branding nhanh.
- Chỉnh tên, slogan, nội dung, sản phẩm, liên hệ trong khối `vi`, `en`, `contact` của file config.
- Không cần đụng đến CSS layout và `app.js`, chỉ quản lý file config và hình ảnh.

## Khai báo AI
- Nhóm đã sử dụng những công cụ AI như: ChatGPT, Gemini để tạo hình ảnh sản phẩm, banner cho thương hiệu giả tưởng.
- Sử dụng Claude để cập nhật README.md

© TPL - Web Design Contest 2026 - Ho Chi Minh City Open University