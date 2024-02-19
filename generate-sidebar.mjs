// node generate-sidebar.mjs

import { generateSidebar } from 'vitepress-sidebar';
import { writeFile } from 'fs/promises';

function transformSidebarContent(originalContent) {
  // Mảng để chứa kết quả đã chuyển đổi
  const transformedContent = [];
  const params = {
    "k": "/do-tat-loi/",
    "v": {
      text: "Gs.Ts Đỗ Tất Lợi", // Đặt tên cố định cho mục này
      //link: "home", // Link mặc định
      collapsed: true, 
    }
  }
  let k = params['k'];
  Object.assign(originalContent[k], params['v']);
  const result = Object.keys(originalContent).map(key => (originalContent[key] ));


  // // Duyệt qua mỗi khóa (key) trong đối tượng ban đầu
  // for (const [base, { items }] of Object.entries(originalContent)) {
  //   // Thêm vào mảng kết quả mới với cấu trúc mong muốn
  //   transformedContent.push({
  //     base: base,
  //     text: "Gs.Ts Đỗ Tất Lợi", // Đặt tên cố định cho mục này
  //     link: "home", // Link mặc định
  //     collapsed: true, // Thiết lập mặc định
  //     items: items // Sử dụng mảng items từ đối tượng ban đầu
  //   });
  // }

  return result;
}

async function createSidebar() {
  var sidebarContent = generateSidebar([
    {
      documentRootPath: 'docs',
      scanStartPath: 'do-tat-loi',
      resolvePath: '/do-tat-loi/',
      collapsed: true,
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useTitleFromFrontmatter: true,
      useFolderLinkFromIndexFile: true,
    },{
      documentRootPath: 'docs',
      scanStartPath: 'hai-thuong-lan-ong',
      resolvePath: '/hai-thuong-lan-ong/',
      collapsed: true,
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useTitleFromFrontmatter: true,
      useFolderLinkFromIndexFile: true,
      }  
    ]);
    const result = transformSidebarContent(sidebarContent);
  //const sidebarContent = generateSidebar();
  await writeFile('./docs/.vitepress/sidebar.json', JSON.stringify(result, null, 2));
  console.log('Sidebar file has been generated.');
}

createSidebar().catch(console.error);
