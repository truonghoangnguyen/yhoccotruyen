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

  return result;
}

async function createSidebar() {
  const commonFields = {
    documentRootPath: 'docs',
    collapsed: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFrontmatter: true,
    useFolderLinkFromIndexFile: true,
  };

  const uniqueFieldsArray = [
    {
      scanStartPath: 'yhctvn',
      resolvePath: '/yhctvn/',
      "v": {
        text: "Y học Cổ truyền", // Đặt tên cố định cho mục này
        //link: "home", // Link mặc định
        collapsed: true, 
      }
    },
    {
      scanStartPath: 'do-tat-loi',
      resolvePath: '/do-tat-loi/',
      "v": {
        text: "Gs.Ts Đỗ Tất Lợi", // Đặt tên cố định cho mục này
        //link: "home", // Link mặc định
        collapsed: true, 
      },
      'sub':{ // đoạn này hơi ép 
        text: 'ctvvtvn',
        newtext: 'Cây & Vị thuốc VN '
      }
    },
    // {
    //   scanStartPath: 'hai-thuong-lan-ong',
    //   resolvePath: '/hai-thuong-lan-ong/',
    //   "v": {
    //     text: "Hải Thượng Lãn Ông", // Đặt tên cố định cho mục này
    //     //link: "home", // Link mặc định
    //     collapsed: true, 
    //   }
    // }
  ];
  // add 
  const params = uniqueFieldsArray.map(item => ({
      ...item,
      ...commonFields
  }));

  var genSidebar = generateSidebar(params);
  for (const item of params) {
    let k = item['resolvePath'];
    // add new prop
    Object.assign(genSidebar[k], item['v']);
    if (item['sub']){
      let sItems = genSidebar[k]["items"];
      for(let sItem of sItems){
        if(sItem["text"] == item['sub']["text"]){
          sItem["text"] = item['sub']["newtext"]
          break;
        }
      }
    }
  }

  //let k = params['resolvePath'];
  //Object.assign(originalContent[k], params['v']);
  const result = Object.keys(genSidebar).map(key => (genSidebar[key] ));
  
  //const result = transformSidebarContent(sidebarContent);
  //const sidebarContent = generateSidebar();
  await writeFile('./docs/.vitepress/sidebar.json', JSON.stringify(result, null, 2));
  console.log('Sidebar file has been generated.');
}

createSidebar().catch(console.error);
