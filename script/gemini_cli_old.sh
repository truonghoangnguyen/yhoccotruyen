#!/bin/bash

# run
# (venv) ng@Johns-MacBook-Pro script % ./gemini_cli.sh

INPUT_FOLDER="trungtamthuoc.com"
OUTPUT_FILE="doc.txt"

> "$OUTPUT_FILE"
echo "Đã tạo mới file $OUTPUT_FILE"

# VÒNG LẶP XỬ LÝ TỪNG FILE MARKDOWN
for filepath in "$INPUT_FOLDER"/*.md; do
  filename=$(basename -- "$filepath")
  base_name="${filename%.md}"
  plant_name=$(echo "$base_name" | sed -e 's/-/ /g' -e 's/\b\(.\)/\u\1/g')

  echo "Đang xử lý file: $filename"

  # --- DÒNG LỆNH GỌI GEMINI ĐÃ ĐƯỢC TỐI GIẢN ---
  # Prompt bây giờ chỉ cần ngắn gọn vì mọi chỉ thị đã nằm trong GEMINI.md
  result=$(cat "$filepath" | gemini "Trích xuất công dụng chính từ nội dung được cung cấp.")

  # --- GHI KẾT QUẢ VÀO FILE ---
  echo "$plant_name: [$result]" >> "$OUTPUT_FILE"
done

echo "--- HOÀN TẤT! ---"
echo "Kiểm tra kết quả trong file $OUTPUT_FILE"