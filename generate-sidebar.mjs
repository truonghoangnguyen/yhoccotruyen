// node generate-sidebar.mjs
// https://github.com/jooy2/vitepress-sidebar
import { generateSidebar } from 'vitepress-sidebar';
import { writeFile } from 'fs/promises';

function updateText(jsonData, updates) {
  jsonData.forEach(item => {
    // Cập nhật trường "text" nếu trùng với giá trị cần thay đổi
    if (updates[item.text]) {
      if (item.items){
        console.log(updates[item.text]);
        item.items.unshift(updates[item.text]['items']);
      }
      item.text = updates[item.text]['text'];
    }
    
    // Nếu có "items", áp dụng đệ quy
    if (item.items) {
      updateText(item.items, updates);
    }
  });
}


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
  ////
  
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
  var result = Object.keys(genSidebar).map(key => (genSidebar[key] ));
  
  result = genSidebar = generateSidebar({
    documentRootPath: '/docs',
    useTitleFromFileHeading: true,
    collapsed: true, 
    //hyphenToSpace: true,
  });
  //

  const updates = {
    "yhctvn": {text:"Y học Cổ truyền", items: {text: "Giới thiệu", link: "/yhctvn/"} },
    "do-tat-loi": {text:"GsTs Đỗ Tất Lợi", items: {text: "Giới thiệu", link: "/do-tat-loi/"} },
    "ctvvtvn": {text: "S.Cây Thuốc và Vị Thuốc", items: {text: "Giới thiệu", link: "/do-tat-loi/ctvvtvn/"} },
    "hai-thuong-lan-ong": {text: "Hải Thượng Lãn Ông", items: {text: "Giới thiệu", link: "/hai-thuong-lan-ong/"} },
    "y-hai-cau-nguyen":{text: "Y Hải Cầu Nguyên", items: {text: "Giới thiệu", link: "/hai-thuong-lan-ong/y-hai-cau-nguyen/"} },
    "noi-kinh-yeu-chi": {text: "Nội Kinh yếu chỉ", items: {text: "Giới thiệu", link: "/hai-thuong-lan-ong/noi-kinh-yeu-chi/"} },
  };
  updateText(result, updates);

  //const result = transformSidebarContent(sidebarContent);
  //const sidebarContent = generateSidebar();
  await writeFile('./docs/.vitepress/sidebar.json', JSON.stringify(result, null, 2));
  console.log('Sidebar file has been generated.');
}

createSidebar().catch(console.error);
