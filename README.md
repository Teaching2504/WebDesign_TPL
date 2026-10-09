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
| (Họ) Kim Phụng | Lên ý tưởng và code JSON brand 2 (Punévie)/ Chỉnh sửa, bổ sung HTML, CSS, JS |
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
...


© TPL - Web Design Contest 2026 - Ho Chi Minh City Open University