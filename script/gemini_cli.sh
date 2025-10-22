#!/bin/bash

# --- CẤU HÌNH ---
# Thay vì quét một thư mục, chúng ta đọc từ một file danh sách
LIST_FILE="trungtamthuoc.com/1filelist.txt"
OUTPUT_FILE="doc.txt"

# Kiểm tra xem file danh sách có tồn tại không
if [ ! -f "$LIST_FILE" ]; then
    echo "Lỗi: File danh sách '$LIST_FILE' không tồn tại."
    exit 1
fi

# --- XÓA FILE KẾT QUẢ CŨ ĐỂ BẮT ĐẦU LẠI ---
> "$OUTPUT_FILE"
echo "Đã tạo mới file $OUTPUT_FILE"

# --- VÒNG LẶP ĐỌC TỪNG DÒNG TRONG FILE DANH SÁCH ---
while IFS= read -r filepath || [[ -n "$filepath" ]]; do
  # Bỏ qua các dòng trống trong file danh sách
  if [ -z "$filepath" ]; then
    continue
  fi

  # Kiểm tra xem file được liệt kê có thực sự tồn tại không
  if [ ! -f "$filepath" ]; then
    echo "Cảnh báo: File '$filepath' được liệt kê nhưng không tìm thấy. Bỏ qua."
    continue
  fi

  # Lấy tên file từ đường dẫn (ví dụ: yen-sao.md)
  filename=$(basename -- "$filepath")

  # Bỏ đuôi .md để lấy tên gốc (ví dụ: yen-sao)
  base_name="${filename%.md}"

  # Chuyển đổi tên gốc thành tên cây thuốc viết hoa (ví dụ: Yến Sào)
  plant_name=$(echo "$base_name" | sed -e 's/-/ /g' -e 's/\b\(.\)/\u\1/g')

  echo "Đang xử lý từ danh sách: $plant_name"

  # --- DÒNG LỆNH GỌI GEMINI (vẫn ngắn gọn nhờ GEMINI.md) ---
  result=$(cat "$filepath" | gemini "Trích xuất công dụng chính từ nội dung được cung cấp.")

  # --- GHI KẾT QUẢ VÀO FILE ---
  echo "- $result ($filepath)" >> "$OUTPUT_FILE"

done < "$LIST_FILE" # <-- Dòng này quan trọng: Chuyển hướng nội dung file danh sách vào vòng lặp while

echo "--- HOÀN TẤT! ---"
echo "Đã xử lý các file từ $LIST_FILE. Kiểm tra kết quả trong $OUTPUT_FILE."