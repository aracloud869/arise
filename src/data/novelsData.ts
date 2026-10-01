import { Novel } from '../types';

export const ALL_NOVELS_DATA: Novel[] = [
  // =========================================================================
  // PHẦN 1: TÂM LÝ HỌC, TƯ DUY ĐỈNH CAO & BẢN LĨNH CHÚA TỂ (15 BỘ SÁCH / TRUYỆN)
  // =========================================================================
  {
    id: 'psy-01',
    title: 'Tâm Lý Học Hành Vi Của Kẻ Thao Túng: Đọc Vị & Phòng Vệ',
    author: 'Tiến Sĩ Hắc Ám David J. Lieberman & Viện Nghiên Cứu Thợ Săn',
    genre: 'Tâm Lý Học, Đọc Vị Hành Vi, Tư Duy Chiến Lược',
    category: 'psychology',
    coverAccent: '#38bdf8',
    readTimeMinutes: 18,
    totalReads: 42300,
    rating: 4.9,
    description: 'Nghệ thuật thấu thị tâm lý con người trong tích tắc. Giải mã ngôn ngữ cơ thể, vi biểu cảm và kỹ thuật phòng thủ trước những kẻ thao túng tinh vi.',
    chapters: [
      {
        id: 1001,
        chapterNumber: 1,
        title: 'Chương 1: Bản Năng Cảnh Giác & Vi Biểu Cảm Khuôn Mặt',
        publishDate: 'Hôm nay',
        isNew: true,
        content: [
          'Trong thế giới đầy rẫy hiểm nguy của các hầm ngục và thương trường, kẻ thù nguy hiểm nhất không phải là những con ma thú nanh nhọn, mà là những kẻ mang nụ cười giả tạo đứng cạnh bạn.',
          'Một cái chớp mắt chậm hơn 0.2 giây, một góc môi giật nhẹ khi nghe tin bạn thức tỉnh, hay phản xạ nuốt nước bọt vô thức khi bị dồn vào góc tường... Tất cả đều là manh mối tiết lộ sự thật.',
          'Nguyên tắc số 1 của Đọc Vị: Con người có thể nói dối bằng lời nói, nhưng hệ thần kinh thực vật không bao giờ biết lừa dối. Khi một người che giấu sự sợ hãi, đồng tử của họ sẽ co thắt lại trong vòng 50 mili-giây trước khi giãn to ra.',
          'Sung Jin-woo đã từng nói: "Trước khi vung đao đoạt mạng kẻ thù, hãy đọc thấu nỗi sợ hãi tột cùng đang gặm nhấm linh hồn hắn."'
        ],
      },
      {
        id: 1002,
        chapterNumber: 2,
        title: 'Chương 2: Thiết Lập Ranh Giới Tâm Lý Bất Khả Xâm Phạm',
        publishDate: 'Hôm qua',
        content: [
          'Kẻ thao túng luôn thăm dò giới hạn của bạn bằng những yêu cầu nhỏ nhặt vô hại. Nếu bạn nhượng bộ lần đầu, chúng sẽ chiếm đoạt linh hồn bạn ở lần thứ hai.',
          'Học cách nói "KHÔNG" dứt khoát với ánh mắt nhìn thẳng vào sống mũi đối phương. Đừng biện minh, đừng giải thích dài dòng. Sự im lặng sau lời từ chối chính là bức tường thành uy lực nhất.',
          'Khi bạn làm chủ được sự bình thản trước mọi lời khiêu khích, bạn đã nắm giữ 80% thế chủ động trong bất kỳ cuộc đàm phán sinh tử nào.'
        ],
      },
    ],
  },
  {
    id: 'psy-02',
    title: 'Bản Lĩnh Chúa Tể: 48 Quy Luật Quyền Lực & Tâm Lý Học Thống Trị',
    author: 'Robert Greene & Tinh Hoa Quân Vương',
    genre: 'Tâm Lý Học Quyền Lực, Thuật Lãnh Đạo, Tư Duy Thống Trị',
    category: 'psychology',
    coverAccent: '#a855f7',
    readTimeMinutes: 22,
    totalReads: 58900,
    rating: 5.0,
    description: 'Tuyệt tác tâm lý học quyền lực. Cách thức xây dựng uy quyền vô hình, kiểm soát thế trận và thu phục lòng người mà không cần cất lời.',
    chapters: [
      {
        id: 1011,
        chapterNumber: 1,
        title: 'Quy Luật 1: Luôn Nói Ít Hơn Mức Cần Thiết',
        publishDate: 'Hôm nay',
        isNew: true,
        content: [
          'Càng nói nhiều, bạn càng dễ để lộ điểm yếu. Những vị vua vĩ đại nhất trong lịch sử luôn là những người kiệm lời nhất.',
          'Khi bạn giữ im lặng, đối phương sẽ cảm thấy bất an và tự động điền vào khoảng trống bằng những lời bộc bạch thiếu kiểm soát. Đó là lúc quyền lực vô hình chuyển dịch hoàn toàn về phía bạn.',
          'Chúa Tể Bóng Tối không cần phải hò hét ra lệnh. Chỉ một câu nói duy nhất vang lên trong hư không: "ARISE" — và hàng triệu sinh mệnh lập tức quy phục.'
        ],
      },
      {
        id: 1012,
        chapterNumber: 2,
        title: 'Quy Luật 2: Khống Chế Trái Tim Bằng Nỗi Sợ Và Sự Tôn Kính',
        publishDate: '2 ngày trước',
        content: [
          'Tình thương có thể phai nhạt, nhưng sự kính sợ sâu sắc trước sức mạnh tuyệt đối sẽ tồn tại vĩnh cửu.',
          'Hãy làm cho bản thân trở nên bí ẩn, khó lường. Khi kẻ thù không thể đoán trước được đòn đánh tiếp theo của bạn, chúng đã thua một nửa trận chiến trong tâm trí.'
        ],
      },
    ],
  },
  {
    id: 'psy-03',
    title: 'Khắc Kỷ Trong Nghịch Cảnh Tử Thần (Stoicism for Hunters)',
    author: 'Marcus Aurelius & Trường Phái Khắc Kỷ Hầm Ngục',
    genre: 'Chủ Nghĩa Khắc Kỷ, Tâm Lý Học Kiên Cường, Kiểm Soát Cảm Xúc',
    category: 'psychology',
    coverAccent: '#10b981',
    readTimeMinutes: 16,
    totalReads: 36700,
    rating: 4.8,
    description: 'Làm thế nào để giữ một cái đầu lạnh như băng tuyết khi đối mặt với cái chết cận kề và những biến cố kinh hoàng nhất của cuộc đời.',
    chapters: [
      {
        id: 1021,
        chapterNumber: 1,
        title: 'Chương 1: Phân Biệt Điều Bạn Kiểm Soát Được Và Không Kiểm Soát Được',
        publishDate: 'Hôm nay',
        content: [
          'Bạn không thể kiểm soát việc một Cổng Đỏ đột ngột mở ra dưới chân mình. Nhưng bạn hoàn toàn kiểm soát được nhịp thở, tư thế cầm đao và sự tĩnh lặng trong tâm hồn.',
          'Sự đau đớn là điều không thể tránh khỏi, nhưng sự đau khổ là một lựa chọn tâm lý. Người thợ săn thực thụ không than vãn về hoàn cảnh — họ biến nghịch cảnh thành bàn đạp để tiến hóa.'
        ],
      },
    ],
  },
  {
    id: 'psy-04',
    title: 'Tâm Trí Bất Bại: Tâm Lý Học Thao Túng Sát Khí',
    author: 'Sun Tzu & Viện Chiến Lược Solo Leveling',
    genre: 'Tâm Lý Chiến, Sát Khí, Phản Xạ Sinh Tử',
    category: 'psychology',
    coverAccent: '#ef4444',
    readTimeMinutes: 20,
    totalReads: 41200,
    rating: 4.9,
    description: 'Nghệ thuật chuyển hóa nỗi sợ hãi thành sát khí áp đảo. Đè bẹp ý chí chiến đấu của kẻ thù trước khi vũ khí chạm nhau.',
    chapters: [
      {
        id: 1031,
        chapterNumber: 1,
        title: 'Chương 1: Sự Tĩnh Lặng Của Kẻ Săn Mồi',
        publishDate: 'Vừa xong',
        isNew: true,
        content: [
          'Khi đối đầu với kẻ địch mạnh hơn gấp mười lần, sai lầm lớn nhất là để nhịp tim vượt quá 140 nhịp/phút. Hít sâu bằng cơ hoành, tập trung toàn bộ ý niệm vào điểm yếu yết hầu đối thủ.'
        ],
      },
    ],
  },
  {
    id: 'psy-05',
    title: 'Tâm Lý Học Đám Đông & Thuật Thôi Miên Quần Chúng',
    author: 'Gustave Le Bon (Hiệu Đính Thợ Săn)',
    genre: 'Tâm Lý Xã Hội, Đám Đông, Thao Túng Dư Luận',
    category: 'psychology',
    coverAccent: '#f59e0b',
    readTimeMinutes: 19,
    totalReads: 31500,
    rating: 4.7,
    description: 'Tại sao đám đông luôn bị cảm xúc dẫn dắt thay vì lý trí? Cách các bang hội lớn định hướng dư luận thế giới.',
    chapters: [
      {
        id: 1041,
        chapterNumber: 1,
        title: 'Chương 1: Ảo Tưởng Của Sự An Toàn Tập Thể',
        publishDate: '3 ngày trước',
        content: [
          'Đám đông không bao giờ tìm kiếm chân lý; họ chỉ khao khát những ảo tưởng xoa dịu nỗi sợ hãi của chính mình.'
        ],
      },
    ],
  },
  {
    id: 'psy-06',
    title: 'Giải Mã Tâm Lý Ma Thú & Con Người Dưới Áp Lực Sinh Tử',
    author: 'Giáo Sư Thần Kinh Học Baek Yoon-ho',
    genre: 'Tâm Lý Sinh Tồn, Thần Kinh Học, Bản Năng Ma Thú',
    category: 'psychology',
    coverAccent: '#06b6d4',
    readTimeMinutes: 15,
    totalReads: 27800,
    rating: 4.8,
    description: 'Phân tích phản xạ chiến-hay-biến (Fight or Flight) của não bộ khi đối mặt với trùm hầm ngục hạng S.',
    chapters: [
      {
        id: 1051,
        chapterNumber: 1,
        title: 'Chương 1: Khi Adrenaline Trở Thành Vũ Khí Hai Lưỡi',
        publishDate: 'Hôm nay',
        content: [
          'Hormone adrenaline giúp tăng sức mạnh tức thì, nhưng nếu không kiểm soát, nó sẽ làm thu hẹp tầm nhìn ngoại vi (Tunnel Vision).'
        ],
      },
    ],
  },
  {
    id: 'psy-07',
    title: 'Tư Duy Bậc Thầy: Nghệ Thuật Đọc Vị Lời Nói Dối Trong 3 Giây',
    author: 'Paul Ekman & Đặc Vụ Cục Thợ Săn Quốc Gia',
    genre: 'Tâm Lý Học Tội Phạm, Phát Hiện Nói Dối, Vi Biểu Cảm',
    category: 'psychology',
    coverAccent: '#6366f1',
    readTimeMinutes: 21,
    totalReads: 49000,
    rating: 4.9,
    description: 'Bộ cẩm nang chi tiết nhất về cách phát hiện kẻ phản bội trong đội thám hiểm hầm ngục.',
    chapters: [
      {
        id: 1061,
        chapterNumber: 1,
        title: 'Chương 1: 7 Biểu Cảm Cốt Lõi Của Sự Bội Phản',
        publishDate: 'Hôm qua',
        content: [
          'Sự khinh miệt không đối xứng ở khóe môi trái là dấu hiệu rõ ràng nhất của một kẻ chuẩn bị đâm sau lưng bạn.'
        ],
      },
    ],
  },
  {
    id: 'psy-08',
    title: 'Nghệ Thuật Đàm Phán Sinh Tử: Không Bao Giờ Nhượng Bộ',
    author: 'Chris Voss & Đàm Phán Cấp Quốc Gia',
    genre: 'Tâm Lý Học Đàm Phán, Thuyết Phục, Quyết Định Sinh Tử',
    category: 'psychology',
    coverAccent: '#ec4899',
    readTimeMinutes: 25,
    totalReads: 38700,
    rating: 5.0,
    description: 'Kỹ thuật dùng giọng nói đêm muộn và câu hỏi định hướng để xoay chuyển cục diện đàm phán bế tắc.',
    chapters: [
      {
        id: 1071,
        chapterNumber: 1,
        title: 'Chương 1: Đừng Bao Giờ Chia Đôi Sự Thật',
        publishDate: '4 ngày trước',
        content: [
          'Thỏa hiệp trong tình huống sinh tử chính là sự thất bại từ từ. Hãy để đối phương tự nói ra điều bạn muốn.'
        ],
      },
    ],
  },
  {
    id: 'psy-09',
    title: 'Tâm Lý Học Tái Sinh: Vượt Qua Chấn Thương Sau Hầm Ngục',
    author: 'Bác Sĩ Trị Liệu Han Song-yi',
    genre: 'Tâm Lý Trị Liệu, Vượt Qua Nỗi Sợ, Chữa Lành Tâm Trí',
    category: 'psychology',
    coverAccent: '#14b8a6',
    readTimeMinutes: 14,
    totalReads: 22100,
    rating: 4.8,
    description: 'Phương pháp tái cấu trúc tư duy và phục hồi tinh thần sau những trải nghiệm cận kề cái chết.',
    chapters: [
      {
        id: 1081,
        chapterNumber: 1,
        title: 'Chương 1: Chấp Nhận Vết Sẹo Của Linh Hồn',
        publishDate: 'Hôm nay',
        content: [
          'Vết sẹo không phải là dấu tích của sự yếu đuối, mà là minh chứng rằng bạn đã sống sót qua cơn bão.'
        ],
      },
    ],
  },
  {
    id: 'psy-10',
    title: 'Bí Thuật Thu Phục Nhân Tâm: Cách Thống Lĩnh Vạn Quân',
    author: 'Dale Carnegie & Chúa Tể Bóng Tối Ashborn',
    genre: 'Nghệ Thuật Lãnh Đạo, Thu Phục Lòng Người, Uy Quyền',
    category: 'psychology',
    coverAccent: '#8b5cf6',
    readTimeMinutes: 18,
    totalReads: 35400,
    rating: 4.9,
    description: 'Bí mật đằng sau lòng trung thành tuyệt đối của Hiệp Sĩ Igris và Đại Tướng Quân Beru.',
    chapters: [
      {
        id: 1091,
        chapterNumber: 1,
        title: 'Chương 1: Lắng Nghe Khát Vọng Sâu Thẳm Của Thuộc Hạ',
        publishDate: 'Hôm qua',
        content: [
          'Kẻ cai trị bằng sự sợ hãi sẽ bị lật đổ khi suy yếu. Người lãnh đạo bằng sự thấu cảm sẽ được phụng sự đến hơi thở cuối cùng.'
        ],
      },
    ],
  },
  {
    id: 'psy-11',
    title: 'Tâm Lý Học Nghịch Biến: Biến Căm Hờn Thành Động Lực Bất Tận',
    author: 'Friedrich Nietzsche & Tinh Thần Thợ Săn',
    genre: 'Triết Học Tâm Lý, Ý Chí Quyền Lực, Vượt Ngưỡng',
    category: 'psychology',
    coverAccent: '#e11d48',
    readTimeMinutes: 17,
    totalReads: 29900,
    rating: 4.7,
    description: 'Những gì không thể giết chết được bạn sẽ làm cho bạn trở nên hùng mạnh hơn gấp bội phần.',
    chapters: [
      {
        id: 1101,
        chapterNumber: 1,
        title: 'Chương 1: Khi Nhìn Vào Vực Thẳm',
        publishDate: '5 ngày trước',
        content: [
          'Khi bạn nhìn vào vực thẳm đủ lâu, vực thẳm cũng sẽ nhìn thấu vào tâm can bạn. Hãy biến bóng tối thành sức mạnh của chính mình.'
        ],
      },
    ],
  },
  {
    id: 'psy-12',
    title: 'Tư Duy Sát Thủ: Tách Biệt Cảm Xúc Khỏi Quyết Định Sinh Tử',
    author: 'Hắc Y Thợ Săn Kang Tae-shik',
    genre: 'Tâm Lý Chiến Lược, Quyết Đoán, Tư Duy Lạnh',
    category: 'psychology',
    coverAccent: '#475569',
    readTimeMinutes: 16,
    totalReads: 33200,
    rating: 4.8,
    description: 'Làm thế nào để đưa ra quyết định tàn nhẫn nhưng chính xác nhất trong 1/10 giây.',
    chapters: [
      {
        id: 1111,
        chapterNumber: 1,
        title: 'Chương 1: Lưỡi Dao Không Có Trái Tim',
        publishDate: 'Hôm nay',
        content: [
          'Sự do dự dù chỉ 1 phần trăm giây cũng đủ để đổi lấy một mạng người. Trong chiến đấu, lòng trắc ẩn đặt sai chỗ là tội ác.'
        ],
      },
    ],
  },
  {
    id: 'psy-13',
    title: 'Tâm Lý Học Động Lực: Vượt Qua Sự Lười Biếng & Trì Hoãn Cốt Lõi',
    author: 'Tiến Sĩ Tâm Lý Học Hệ Thống Thức Tỉnh',
    genre: 'Tâm Lý Học Năng Suất, Kỷ Luật Bản Thân, Dopamine Detox',
    category: 'psychology',
    coverAccent: '#eab308',
    readTimeMinutes: 19,
    totalReads: 44800,
    rating: 4.9,
    description: 'Cơ chế kích hoạt Dopamine của Hệ Thống rèn luyện 100 lần hít đất mỗi ngày để tạo nên kỳ tích.',
    chapters: [
      {
        id: 1121,
        chapterNumber: 1,
        title: 'Chương 1: Quy Tắc 5 Giây Để Chiến Thắng Cơn Lười',
        publishDate: '2 ngày trước',
        content: [
          'Não bộ mất 5 giây để tìm lý do bào chữa. Hãy đếm 5-4-3-2-1 và lập tức bắt đầu bài tập đầu tiên!'
        ],
      },
    ],
  },
  {
    id: 'psy-14',
    title: 'Tâm Lý Học Tự Tin Tuyệt Đối: Xóa Bỏ Hội Chứng Kẻ Giả Mạo',
    author: 'Cha Hae-in & Hội Thợ Săn Hàn Quốc',
    genre: 'Tự Tin Bản Thân, Tâm Lý Tích Cực, Khẳng Định Giá Trị',
    category: 'psychology',
    coverAccent: '#f43f5e',
    readTimeMinutes: 15,
    totalReads: 26700,
    rating: 4.8,
    description: 'Ngay cả khi bạn chỉ là Thợ Săn Hạng E, hãy bước đi với phong thái của một Quân Vương tương lai.',
    chapters: [
      {
        id: 1131,
        chapterNumber: 1,
        title: 'Chương 1: Định Danh Lại Bản Thân',
        publishDate: 'Hôm nay',
        content: [
          'Thế giới đối xử với bạn dựa trên cách bạn tự nhìn nhận chính mình. Đừng bao giờ hạ thấp giá trị bản thân trước bất kỳ ai.'
        ],
      },
    ],
  },
  {
    id: 'psy-15',
    title: 'Tâm Trí Kim Cương: Bí Thuật Thiền Định Sức Mạnh Ma Lực',
    author: 'Đại Thiền Sư Chùa Vàng & Thợ Săn Tâm Pháp',
    genre: 'Thiền Định, Tĩnh Tâm, Khai Mở Tiềm Năng Não Bộ',
    category: 'psychology',
    coverAccent: '#0ea5e9',
    readTimeMinutes: 20,
    totalReads: 38100,
    rating: 4.9,
    description: 'Khai mở 100% dòng chảy ma lực nội tại thông qua kỹ thuật điều hòa hơi thở sâu.',
    chapters: [
      {
        id: 1141,
        chapterNumber: 1,
        title: 'Chương 1: Hơi Thở Của Khoảng Không Vô Tận',
        publishDate: 'Hôm qua',
        content: [
          'Khi tâm trí hoàn toàn tĩnh lặng, bạn sẽ nghe thấy cả tiếng rơi của một hạt bụi và bước chân lén lút của kẻ thù từ cách xa 100 mét.'
        ],
      },
    ],
  },

  // =========================================================================
  // PHẦN 2: SOLO LEVELING & BIÊN NIÊN SỬ THỢ SĂN (13 BỘ TRUYỆN)
  // =========================================================================
  {
    id: 'novel-solo-leveling-main',
    title: 'Solo Leveling: Ngoại Truyện Chúa Tể Bóng Tối (Chính Tông)',
    author: 'Chugong (Bản Dịch Bản Quyền Cao Cấp)',
    genre: 'Hành Động, Siêu Nhiên, Thợ Săn, Hệ Thống',
    category: 'solo_leveling',
    coverAccent: '#00d2ff',
    readTimeMinutes: 25,
    totalReads: 92400,
    rating: 5.0,
    description: 'Sau khi thiết lập lại dòng thời gian, Sung Jin-woo âm thầm bảo vệ Trái Đất khỏi các thế lực vũ trụ tà ác.',
    chapters: [
      {
        id: 2001,
        chapterNumber: 1,
        title: 'Chương 1: Bóng Đêm Tĩnh Lặng Trở Lại',
        publishDate: 'Hôm nay',
        isNew: true,
        content: [
          'Thành phố Seoul chìm trong ánh đèn đêm lấp lánh. Không còn cánh cổng màu xanh, không còn những thợ săn hạng S được tung hô như những ngôi sao thể thao.',
          'Sung Jin-woo đứng trên đỉnh tòa tháp Lotte World, chiếc áo khoác đen bay nhẹ trong cơn gió lạnh. Đôi mắt anh ánh lên tia sáng xanh lam rực rỡ đặc trưng của Chúa Tể Bóng Tối.',
          '"My Liege..." Giọng nói trầm ổn, đầy cung kính của Igris vang lên từ phía sau cái bóng.',
          '"Ngươi cũng cảm nhận được đúng không, Igris?" Jin-woo khẽ nhếch môi.',
          'Một vết nứt không gian kỳ lạ vừa xuất hiện ở tầng bình lưu Trái Đất. Không phải do các Hoàng Đế để lại, mà là một thế lực cổ xưa hơn rất nhiều. Hệ thống trong đầu anh khẽ reo lên một tiếng thông báo thanh thúy quen thuộc...',
          '[THÔNG BÁO: BẠN ĐÃ TIẾP NHẬN MỘT NHIỆM VỤ MỚI]',
          'Jin-woo đưa tay lên, những sợi khói đen cuồn cuộn bốc lên từ lòng bàn tay. "Chuẩn bị đi, các chiến binh. Đêm nay chúng ta đi săn."'
        ],
      },
      {
        id: 2002,
        chapterNumber: 2,
        title: 'Chương 2: Đội Quân Vực Thẳm',
        publishDate: 'Hôm nay',
        content: [
          'Vết nứt không gian rách toạc ra, để lộ ra khoảng không vũ trụ tối đen như mực. Hàng ngàn sinh vật có cánh gai nhọn với lớp giáp bạc lao xuống bầu khí quyển như mưa sao băng.',
          'Beru đứng bên cạnh Jin-woo, hai hàm răng sắc nhọn nghiến lại phát ra âm thanh ken két phấn khích: "Thưa Đức Vua! Xin hãy cho phép thần được xé xác những kẻ ngạo mạn này!"',
          'Jin-woo vẫy nhẹ ngón tay. "Được thôi. Đừng làm kinh động đến người dân bên dưới."',
          '"TUÂN LỆNH!" Beru gầm lên một tiếng rền vang, đôi cánh rung lên với tần số cực đại, thân ảnh lập tức biến mất vào không trung.',
          'Chỉ trong tích tắc, bầu trời đêm rực sáng bởi những vệt chém màu tím sẫm. Đội quân bóng tối của Sung Jin-woo chính thức xuất trận!'
        ],
      },
    ],
  },
  {
    id: 'novel-ragnarok',
    title: 'Solo Leveling: Ragnarok (Hậu Truyện Sung Su-ho Thức Tỉnh)',
    author: 'Daul & Redice Studio',
    genre: 'Hậu Truyện, Thần Thoại, Kế Thừa Quyền Năng',
    category: 'solo_leveling',
    coverAccent: '#9333ea',
    readTimeMinutes: 24,
    totalReads: 78000,
    rating: 4.9,
    description: 'Sung Su-ho, con trai của Chúa Tể Bóng Tối Sung Jin-woo, bước vào hành trình thức tỉnh sức mạnh vĩ đại khi các Ngoại Tộc Thần Thánh xâm lược.',
    chapters: [
      {
        id: 2011,
        chapterNumber: 1,
        title: 'Chương 1: Giấc Mơ Về Đội Quân Bóng Tối Của Cha',
        publishDate: 'Hôm nay',
        isNew: true,
        content: [
          'Sung Su-ho mở mắt ra giữa căn phòng ngủ quen thuộc. Bàn tay cậu khẽ run lên khi một luồng khói đen mờ nhạt bắt đầu cuộn xoáy quanh đầu ngón tay.',
          'Một tin nhắn hologram màu xanh lam hiện ra trước mắt cậu:',
          '[CHÀO MỪNG NGƯỜI CHƠI: SUNG SU-HO]',
          '[BẠN ĐÃ ĐƯỢC CHỌN LÀ NGƯỜI KẾ THỪA DANH HIỆU CHÚA TỂ BÓNG TỐI.]',
          'Beru đột ngột xuất hiện từ cái bóng dưới chân cậu, đôi mắt ngấn lệ mừng rỡ: "TIỂU VƯƠNG TỬ! CUỐI CÙNG NGÀI ĐÃ THỨC TỈNH RỒI!"'
        ],
      },
    ],
  },
  {
    id: 'novel-igris-lore',
    title: 'Biên Niên Sử Huyết Sắc Kỵ Sĩ Igris: Lời Thề Bất Diệt',
    author: 'Sử Gia Hư Không & Solo Leveling Lore',
    genre: 'Ngoại Truyện, Hiệp Sĩ, Hồi Ký Chiến Tranh',
    category: 'solo_leveling',
    coverAccent: '#dc2626',
    readTimeMinutes: 18,
    totalReads: 51200,
    rating: 5.0,
    description: 'Hành trình ngàn năm của Igris từ khi còn là Đại Tướng Quân của Ashborn cho đến ngày trao thanh kiếm trung thành cho Sung Jin-woo.',
    chapters: [
      {
        id: 2021,
        chapterNumber: 1,
        title: 'Chương 1: Lăng Mộ Ngàn Năm Trong Tĩnh Lặng',
        publishDate: 'Hôm qua',
        content: [
          'Hàng ngàn năm đứng gác trong căn phòng ngai vàng lạnh lẽo, Igris chỉ chờ đợi một người duy nhất xứng đáng với chiếc ngai Chúa Tể.'
        ],
      },
    ],
  },
  {
    id: 'novel-beru-chronicles',
    title: 'Vua Kiến Beru: Giấc Mộng Trở Thành Tướng Quân Tối Cao',
    author: 'Hội Ghi Chép Quân Đoàn Bóng Tối',
    genre: 'Hài Hước, Hành Động, Ngoại Truyện Đáng Yêu',
    category: 'solo_leveling',
    coverAccent: '#a21caf',
    readTimeMinutes: 16,
    totalReads: 64500,
    rating: 5.0,
    description: 'Những câu chuyện hậu trường dở khóc dở cười của Beru khi vừa xem phim truyền hình Hàn Quốc vừa bảo vệ gia đình Đức Vua.',
    chapters: [
      {
        id: 2031,
        chapterNumber: 1,
        title: 'Chương 1: Beru Và Chiếc Tivi 65 Inch',
        publishDate: 'Hôm nay',
        content: [
          'Beru ngồi khoanh chân trên thảm phòng khách, vừa ăn bắp rang vừa khóc rưng rức khi xem tập cuối phim tình cảm Hàn Quốc...'
        ],
      },
    ],
  },
  {
    id: 'novel-cha-haein',
    title: 'Nhật Ký Thợ Săn Hạng S Cha Hae-in: Mùi Hương Của Vị Vua',
    author: 'Cha Hae-in (Tự Truyện)',
    genre: 'Lãng Mạn, Thợ Săn, Hành Động',
    category: 'solo_leveling',
    coverAccent: '#f472b6',
    readTimeMinutes: 19,
    totalReads: 48900,
    rating: 4.9,
    description: 'Góc nhìn nội tâm của nữ thợ săn mạnh nhất Hàn Quốc khi lần đầu tiên gặp gỡ thợ săn mang mùi hương dịu mát kỳ lạ Sung Jin-woo.',
    chapters: [
      {
        id: 2041,
        chapterNumber: 1,
        title: 'Chương 1: Mùi Hương Kỳ Lạ Giữa Cơn Bão Ma Thuật',
        publishDate: '3 ngày trước',
        content: [
          'Mọi thợ săn đều mang mùi hôi nồng nặc của ma lực thối rữa. Nhưng anh ấy thì khác... Một mùi hương tĩnh lặng như khu rừng mùa đông.'
        ],
      },
    ],
  },
  {
    id: 'novel-ashborn-origins',
    title: 'Nguồn Gốc Chúa Tể Ánh Sáng & Sự Phản Bội Của Các Sứ Đồ',
    author: 'Ashborn - Chúa Tể Bóng Tối Nguyên Thủy',
    genre: 'Thần Thoại, Sử Thi, Khởi Nguyên Vũ Trụ',
    category: 'solo_leveling',
    coverAccent: '#6366f1',
    readTimeMinutes: 26,
    totalReads: 60200,
    rating: 5.0,
    description: 'Bức màn bí mật về cuộc chiến giữa các Sứ Đồ Ánh Sáng và Hoàng Đế Hủy Diệt thuở sơ khai của vũ trụ.',
    chapters: [
      {
        id: 2051,
        chapterNumber: 1,
        title: 'Chương 1: Ngọn Đèn Tỏa Sáng Nhất Trong Hư Không',
        publishDate: 'Hôm nay',
        content: [
          'Ta từng là Sứ Đồ trung thành nhất của Đấng Sáng Tạo. Cho đến ngày ta nhận ra, cái chết không phải là kết thúc, mà là sự cứu chuỗi vĩ đại nhất.'
        ],
      },
    ],
  },
  {
    id: 'novel-thomas-andre',
    title: 'Thomas Andre: Goliath Bất Bại & Trọng Lực Cấp Quốc Gia',
    author: 'Hiệp Hội Thợ Săn Hoa Kỳ',
    genre: 'Hành Động Hạng Nặng, Thợ Săn Quốc Gia, Quyền Lực',
    category: 'solo_leveling',
    coverAccent: '#fbbf24',
    readTimeMinutes: 20,
    totalReads: 39000,
    rating: 4.8,
    description: 'Cuộc đời bất hảo của thợ săn số 1 nước Mỹ sở hữu sức mạnh thể chất nghiền nát xe tăng và núi non.',
    chapters: [
      {
        id: 2061,
        chapterNumber: 1,
        title: 'Chương 1: Luật Của Kẻ Mạnh Nhất New York',
        publishDate: '4 ngày trước',
        content: [
          '"Ở đất nước này, chỉ có hai thứ không thể bị cản phá: Trọng lực của Trái Đất và nắm đấm của Thomas Andre."'
        ],
      },
    ],
  },
  {
    id: 'novel-bellion-shadow',
    title: 'Đại Thống Soái Bellion: Cánh Tay Phải Của Ngai Vàng Bóng Tối',
    author: 'Sử Ký Quân Đoàn Bất Tử',
    genre: 'Sử Thi Chiến Tranh, Chiến Binh Vô Địch, Trung Thành',
    category: 'solo_leveling',
    coverAccent: '#4c1d95',
    readTimeMinutes: 22,
    totalReads: 45700,
    rating: 4.9,
    description: 'Vị tướng quân đầu tiên sinh ra từ Cây Thế Giới, người nắm giữ thanh kiếm đai răng cưa khổng lồ bất khả chiến bại.',
    chapters: [
      {
        id: 2071,
        chapterNumber: 1,
        title: 'Chương 1: Lưỡi Kiếm Sinh Ra Từ Cây Thế Giới',
        publishDate: 'Hôm nay',
        content: [
          'Hai chiếc cánh đen vĩ đại che khuất cả mặt trời. Bellion quỳ một gối trước Jin-woo: "Thần đã trở về, thưa Đức Vua."'
        ],
      },
    ],
  },
  {
    id: 'novel-iron-tank',
    title: 'Bộ Đôi Khôi Hài: Chuyện Nhà Gấu Tuyết Tank & Hiệp Sĩ Iron',
    author: 'Biên Niên Sử Bóng Tối Vui Nhộn',
    genre: 'Hài Hước, Quân Đoàn Bóng Tối, Phiêu Lưu',
    category: 'solo_leveling',
    coverAccent: '#0284c7',
    readTimeMinutes: 14,
    totalReads: 32800,
    rating: 4.8,
    description: 'Những trận cãi lộn ngộ nghĩnh tranh giành thức ăn và công trạng của chú gấu tuyết Tank và chàng hiệp sĩ Iron.',
    chapters: [
      {
        id: 2081,
        chapterNumber: 1,
        title: 'Chương 1: Trận Chiến Chiếc Đùi Gà Nướng Ma Thuật',
        publishDate: 'Hôm qua',
        content: [
          'Iron giơ chiếc khiên to đùng lên chặn đường chú gấu Tank đang há hốc miệng đòi ăn thịt nướng...'
        ],
      },
    ],
  },
  {
    id: 'novel-sung-il-hwan',
    title: 'Sung Il-hwan: Lời Thề Của Người Cha Bảo Vệ Con Trai',
    author: 'Hồi Ký Thợ Săn Mất Tích',
    genre: 'Tình Cảm Gia Đình, Hy Sinh, Thợ Săn Bí Ẩn',
    category: 'solo_leveling',
    coverAccent: '#b45309',
    readTimeMinutes: 21,
    totalReads: 53100,
    rating: 5.0,
    description: 'Hành trình 10 năm bị mắc kẹt trong khe nứt không gian của cha Sung Jin-woo để bảo vệ sự thức tỉnh của con trai.',
    chapters: [
      {
        id: 2091,
        chapterNumber: 1,
        title: 'Chương 1: Trận Chiến Cuối Cùng Ở Vết Nứt Hoàng Hôn',
        publishDate: 'Hôm nay',
        content: [
          '"Dù có phải chống lại cả các Sứ Đồ Ánh Sáng, ta cũng sẽ bảo vệ tương lai của con trai ta."'
        ],
      },
    ],
  },
  {
    id: 'novel-shadow-realm-daily',
    title: 'Nhật Ký Lãnh Địa Bóng Tối: Đời Sống Sau Giờ Giết Giặc',
    author: 'Tổ Thư Ký Hư Không',
    genre: 'Đời Thường, Huyền Ảo, Hài Hước',
    category: 'solo_leveling',
    coverAccent: '#1e1b4b',
    readTimeMinutes: 15,
    totalReads: 29400,
    rating: 4.8,
    description: 'Bên trong chiếc bóng của Sung Jin-woo có một thế giới khổng lồ nơi hàng chục vạn chiến binh bóng tối sinh sống.',
    chapters: [
      {
        id: 2101,
        chapterNumber: 1,
        title: 'Chương 1: Thành Phố Bóng Đêm Dưới Lòng Bàn Chân',
        publishDate: 'Hôm qua',
        content: [
          'Ở trong thế giới bóng tối, các pháp sư đang xây dựng lâu đài, trong khi Igris đang hướng dẫn các kỵ sĩ tập kiếm pháp.'
        ],
      },
    ],
  },
  {
    id: 'novel-kamish-tales',
    title: 'Huyền Thoại Rồng Lửa Kamish: Nỗi Kinh Hoàng Của Nhân Loại',
    author: 'Cục Lưu Trữ Thảm Họa Quốc Tế',
    genre: 'Thần Thoại Rồng, Thảm Họa, Lịch Sử Thợ Săn',
    category: 'solo_leveling',
    coverAccent: '#ea580c',
    readTimeMinutes: 23,
    totalReads: 47200,
    rating: 4.9,
    description: 'Toàn cảnh chiến dịch tiêu diệt Cự Long Kamish tại Mỹ năm 2017 với sự tham gia của toàn bộ thợ săn mạnh nhất địa cầu.',
    chapters: [
      {
        id: 2111,
        chapterNumber: 1,
        title: 'Chương 1: Bầu Trời Bốc Cháy Trên Đảo Manhattan',
        publishDate: '3 ngày trước',
        content: [
          'Ngọn lửa rồng thiêu rụi cả bê tông cốt thép trong tích tắc. Một tiếng gầm làm rung chuyển toàn bộ Đại Tây Dương.'
        ],
      },
    ],
  },
  {
    id: 'novel-monarch-wars',
    title: 'Đại Chiến 9 Vị Vua: Cuộc Chiến Cổ Xưa Khai Thiên Lập Địa',
    author: 'Biên Niên Sử Vĩnh Hằng',
    genre: 'Sử Thi Thần Thoại, Quyền Năng Vũ Trụ, Chúa Tể',
    category: 'solo_leveling',
    coverAccent: '#7c3aed',
    readTimeMinutes: 27,
    totalReads: 58900,
    rating: 5.0,
    description: 'Cuộc chiến đẫm máu giữa 9 Hoàng Đế Thần Tộc trước khi Trái Đất trở thành chiến trường thử thách.',
    chapters: [
      {
        id: 2121,
        chapterNumber: 1,
        title: 'Chương 1: 9 Ngai Vàng Của Hư Vô',
        publishDate: 'Hôm nay',
        content: [
          'Khi vũ trụ mới hình thành, 9 ngọn lửa quyền năng đã chia tách không gian thành 9 cõi giới huyền bí...'
        ],
      },
    ],
  },

  // =========================================================================
  // PHẦN 3: PHÁT TRIỂN BẢN THÂN, KỶ LUẬT THÉP & THỂ CHẤT (6 BỘ SÁCH)
  // =========================================================================
  {
    id: 'dev-01',
    title: 'Atomic Habits: 100 Lần Hít Đất Thay Đổi Vận Mệnh Thợ Săn',
    author: 'James Clear & Huấn Luyện Viên Hệ Thống Solo',
    genre: 'Thói Quen Nguyên Tử, Kỷ Luật Thép, Phát Triển Bản Thân',
    category: 'self_growth',
    coverAccent: '#22c55e',
    readTimeMinutes: 18,
    totalReads: 61500,
    rating: 4.9,
    description: 'Sức mạnh của việc tích lũy 1% tiến bộ mỗi ngày. Làm thế nào một thợ săn yếu nhất có thể vươn lên đỉnh cao vũ trụ.',
    chapters: [
      {
        id: 3001,
        chapterNumber: 1,
        title: 'Chương 1: Sức Mạnh Kỳ Diệu Của Sự Tích Lũy 1%',
        publishDate: 'Hôm nay',
        content: [
          'Bạn không cần phải trở thành người mạnh nhất ngay hôm nay. Bạn chỉ cần hoàn thành 100 lần hít đất, 100 lần gập bụng và 10km chạy bộ mỗi ngày mà không bỏ cuộc dù chỉ một lần.'
        ],
      },
    ],
  },
  {
    id: 'dev-02',
    title: 'Kỷ Luật Thép: Can’t Hurt Me (Không Thể Làm Tôi Tổn Thương)',
    author: 'David Goggins & Ý Chí Chiến Binh',
    genre: 'Vượt Ngưỡng Thể Lực, Ý Chí Sắt Đá, Kỷ Luật',
    category: 'self_growth',
    coverAccent: '#f97316',
    readTimeMinutes: 22,
    totalReads: 54100,
    rating: 5.0,
    description: 'Quy tắc 40%: Khi não bộ bạn gào thét bảo rằng bạn đã kiệt sức, thực tế bạn mới chỉ sử dụng 40% công suất của cơ thể.',
    chapters: [
      {
        id: 3011,
        chapterNumber: 1,
        title: 'Chương 1: Chiếc Hũ Trơ Lì Của Tâm Trí',
        publishDate: 'Hôm qua',
        content: [
          'Đừng dừng lại khi bạn mệt. Chỉ dừng lại khi bạn đã hoàn thành mục tiêu rèn luyện ngày hôm nay!'
        ],
      },
    ],
  },
  {
    id: 'dev-03',
    title: 'Tập Trung Sâu (Deep Work): Làm Chủ Không Gian Trong Kỷ Nguyên Nhiễu Loạn',
    author: 'Cal Newport & Bí Kíp Rèn Luyện Thần Lực',
    genre: 'Tập Trung Cao Độ, Hiệu Suất Đỉnh Cao, Phát Triển Bản Thân',
    category: 'self_growth',
    coverAccent: '#3b82f6',
    readTimeMinutes: 17,
    totalReads: 39400,
    rating: 4.8,
    description: 'Cách loại bỏ hoàn toàn phiền nhiễu xung quanh để đạt trạng thái dòng chảy ma thuật (Flow State).',
    chapters: [
      {
        id: 3021,
        chapterNumber: 1,
        title: 'Chương 1: Trạng Thái Dòng Chảy Tuyệt Đối',
        publishDate: '3 ngày trước',
        content: [
          'Khi bạn tập trung toàn bộ tâm trí vào một hành động duy nhất, thời gian xung quanh dường như chậm lại.'
        ],
      },
    ],
  },
  {
    id: 'dev-04',
    title: 'Nghệ Thuật Quản Lý Năng Lượng Thể Xác & Tinh Thần',
    author: 'Jim Loehr & Tony Schwartz',
    genre: 'Quản Lý Năng Lượng, Phục Hồi Thần Tốc, Thể Lực',
    category: 'self_growth',
    coverAccent: '#10b981',
    readTimeMinutes: 16,
    totalReads: 28900,
    rating: 4.7,
    description: 'Bí quyết cân bằng giữa xả mana tối đa và phục hồi sinh lực để duy trì chuỗi ngày rèn luyện bất bại.',
    chapters: [
      {
        id: 3031,
        chapterNumber: 1,
        title: 'Chương 1: Quản Lý Năng Lượng Quan Trọng Hơn Thời Gian',
        publishDate: 'Hôm nay',
        content: [
          'Chất lượng của giấc ngủ và khả năng xả mệt mỏi quyết định 90% sức mạnh tấn công của bạn vào ngày mai.'
        ],
      },
    ],
  },
  {
    id: 'dev-05',
    title: 'Tư Duy Bền Bỉ (Grit): Sức Mạnh Của Niềm Đam Mê & Kiên Trì',
    author: 'Angela Duckworth & Viện Nghiên Cứu Chỉ Số',
    genre: 'Ý Chí Bền Bỉ, Kiên Định, Thành Công',
    category: 'self_growth',
    coverAccent: '#8b5cf6',
    readTimeMinutes: 18,
    totalReads: 31200,
    rating: 4.8,
    description: 'Thiên tài không tạo nên thợ săn mạnh nhất — chỉ có sự kiên trì vượt qua hàng ngàn ngày gian khổ mới tạo nên Chúa Tể.',
    chapters: [
      {
        id: 3041,
        chapterNumber: 1,
        title: 'Chương 1: Công Thức Nhân Đôi Tài Năng',
        publishDate: '4 ngày trước',
        content: [
          'Tài năng x Nỗ lực = Kỹ năng. Kỹ năng x Nỗ lực = Thành tựu vĩ đại.'
        ],
      },
    ],
  },
  {
    id: 'dev-06',
    title: 'Tự Do Tài Chính Dành Cho Thợ Săn: Bí Kíp Đầu Tư Vàng Hệ Thống',
    author: 'Morgan Housel & Bang Hội Bạch Hổ',
    genre: 'Tâm Lý Học Tiền Bạc, Đầu Tư Vàng, Quản Lý Tài Sản',
    category: 'self_growth',
    coverAccent: '#eab308',
    readTimeMinutes: 19,
    totalReads: 34500,
    rating: 4.9,
    description: 'Cách sử dụng Vàng kiếm được từ nhiệm vụ và vượt ải hầm ngục để mua sắm trang bị và đầu tư sinh lời tối ưu.',
    chapters: [
      {
        id: 3051,
        chapterNumber: 1,
        title: 'Chương 1: Tâm Lý Học Về Đồng Vàng',
        publishDate: 'Hôm nay',
        content: [
          'Người giàu không phải là người kiếm được nhiều vàng nhất, mà là người biết biến vàng thành những trang bị tăng chỉ số vĩnh viễn.'
        ],
      },
    ],
  },

  // =========================================================================
  // PHẦN 4: TIỂU THUYẾT HUYỀN ẢO & HẦM NGỤC DỊ GIỚI (6 BỘ TRUYỆN)
  // =========================================================================
  {
    id: 'novel-omniscient-reader-full',
    title: 'Toàn Trí Độc Giả: Góc Nhìn Kẻ Tồn Tại Duy Nhất',
    author: 'Sing-Shong',
    genre: 'Sinh Tồn, Tận Thế, Kịch Bản Thần Thoại, Leo Tháp',
    category: 'fantasy',
    coverAccent: '#9d4edd',
    readTimeMinutes: 28,
    totalReads: 85200,
    rating: 5.0,
    description: 'Một ngày nọ, cuốn tiểu thuyết dài 3149 chương mà Kim Dokja là người duy nhất đọc đến chương cuối bỗng trở thành hiện thực tàn khốc.',
    chapters: [
      {
        id: 4001,
        chapterNumber: 1,
        title: 'Chương 1: Khởi Đầu Của Kịch Bản',
        publishDate: 'Hôm nay',
        isNew: true,
        content: [
          'Chuyến tàu điện ngầm tuyến số 3 dừng lại đột ngột giữa đường hầm tối om. Đèn trong toa tàu nhấp nháy rồi phụt tắt.',
          'Một sinh vật nhỏ bé lơ lửng giữa không trung với cặp sừng nhỏ và bộ lông trắng muốt xuất hiện. Đó là Dokkaebi Bihyung.',
          '[Hỡi loài người nhỏ bé, thời gian hưởng thụ miễn phí của các ngươi đã chính thức kết thúc.]',
          '[Kịch bản chính #1: Chứng minh giá trị sinh tồn. Mục tiêu: Giết chết ít nhất một sinh vật sống trong vòng 30 phút.]',
          'Tiếng la hét hoảng loạn vang lên khắp toa tàu. Chỉ có Kim Dokja bình thản mở chiếc điện thoại thông minh của mình lên...'
        ],
      },
    ],
  },
  {
    id: 'novel-sss-hunter-full',
    title: 'Thợ Săn Hạng SSS Tự Sát Để Trở Nên Bất Tử',
    author: 'Shin Noah',
    genre: 'Hồi Quy, Leo Tháp, Hài Hước, Siêu Năng Lực',
    category: 'fantasy',
    coverAccent: '#ef4444',
    readTimeMinutes: 24,
    totalReads: 69800,
    rating: 4.9,
    description: 'Kim Gong-ja mơ ước trở thành thợ săn vĩ đại. Sau khi nhận được kỹ năng sao chép chiêu thức của kẻ giết mình, một con đường điên rồ nhất lịch sử leo tháp đã mở ra.',
    chapters: [
      {
        id: 4011,
        chapterNumber: 1,
        title: 'Chương 1: Kỹ Năng Kẻ Bắt Chước Tuyệt Vọng',
        publishDate: 'Hôm qua',
        content: [
          'Tôi luôn ghen tị với Hoàng Đế Lửa - thợ săn số 1 thế giới. Tại sao hắn có tất cả hào quang, còn tôi chỉ là một kẻ vô danh hạng F sống chen chúc trong căn phòng trọ rẻ tiền?'
        ],
      },
    ],
  },
  {
    id: 'novel-overgeared',
    title: 'Thợ Rèn Huyền Thoại: Dùng Trang Bị Đè Bẹp Mọi Quy Tắc',
    author: 'Park Saenal',
    genre: 'Game Thực Tế Ảo, Rèn Trang Bị, Hài Hước, Vô Địch',
    category: 'fantasy',
    coverAccent: '#eab308',
    readTimeMinutes: 23,
    totalReads: 52400,
    rating: 4.8,
    description: 'Grid - chàng trai nghèo khổ tình cờ hoàn thành nhiệm vụ cấp SSS và chuyển nghề thành Hậu Duệ Của Pagma - Thợ Rèn Thần Thoại.',
    chapters: [
      {
        id: 4021,
        chapterNumber: 1,
        title: 'Chương 1: Quyển Sách Cổ Của Pagma',
        publishDate: '2 ngày trước',
        content: [
          'Khi người khác vất vả luyện kiếm, Grid chỉ cần rèn ra một thanh gươm thần thoại với 5 dòng thuộc tính bá đạo để nghiền nát đối thủ!'
        ],
      },
    ],
  },
  {
    id: 'novel-greatest-estate',
    title: 'Đệ Nhất Địa Chủ Hoàng Gia: Kiến Thiết Dị Giới',
    author: 'BK_Moon',
    genre: 'Chuyển Sinh, Xây Dựng Lãnh Địa, Hài Hước, Kỹ Thuật',
    category: 'fantasy',
    coverAccent: '#059669',
    readTimeMinutes: 20,
    totalReads: 48600,
    rating: 4.9,
    description: 'Kỹ sư xây dựng Kim Su-ho chuyển sinh thành thiếu gia ăn chơi Frontera và dùng kiến thức xây dựng hiện đại để xưng bá dị giới.',
    chapters: [
      {
        id: 4031,
        chapterNumber: 1,
        title: 'Chương 1: Món Nợ Ngàn Vàng Của Gia Tộc',
        publishDate: 'Hôm nay',
        content: [
          'Muốn giàu có và không phải đi săn ma thú khổ cực? Hãy xây dựng đường xá, hệ thống nước nóng và biến lãnh địa thành thiên đường!'
        ],
      },
    ],
  },
  {
    id: 'novel-second-life-ranker',
    title: 'Bậc Thầy Trở Lại: Báo Thù Tháp Thần Linh',
    author: 'Sadoyeon',
    genre: 'Báo Thù, Leo Tháp, Hành Động, Siêu Năng Lực',
    category: 'fantasy',
    coverAccent: '#701a75',
    readTimeMinutes: 22,
    totalReads: 44100,
    rating: 4.8,
    description: 'Yeon-woo bước vào Tháp Thần Linh với chiếc đồng hồ bỏ túi của người em trai quá cố để tìm kiếm và tiêu diệt những kẻ phản bội.',
    chapters: [
      {
        id: 4041,
        chapterNumber: 1,
        title: 'Chương 1: Chiếc Đồng Hồ Bỏ Túi Bí Ẩn',
        publishDate: '3 ngày trước',
        content: [
          'Giọng nói của người em trai vang lên từ chiếc đồng hồ: "Anh trai, nếu anh nghe được đoạn băng này, em có lẽ đã chết trong Tháp Thần Linh..."'
        ],
      },
    ],
  },
  {
    id: 'novel-trash-count',
    title: 'Kẻ Bị Ruồng Bỏ Của Gia Đình Bá Tước',
    author: 'Yoo Ryeo Han',
    genre: 'Chuyển Sinh, Quý Tộc, Chiến Thuật, Gia Đình',
    category: 'fantasy',
    coverAccent: '#c026d3',
    readTimeMinutes: 21,
    totalReads: 41800,
    rating: 4.9,
    description: 'Kim Rok-su chuyển sinh thành Cale Henituse - tên quý tộc rác rưởi. Mục tiêu duy nhất của cậu là sống một cuộc đời lười biếng và an nhàn nhưng lại vô tình cứu rỗi cả thế giới.',
    chapters: [
      {
        id: 4051,
        chapterNumber: 1,
        title: 'Chương 1: Khi Tôi Mở Mắt Thành Tên Rác Rưởi',
        publishDate: 'Hôm nay',
        content: [
          'Tôi chỉ muốn uống rượu ngon, ăn thịt bò nướng và ngủ trong lâu đài ấm áp. Tại sao các vị thần lại bắt tôi phải đi giải cứu thế giới?!'
        ],
      },
    ],
  },
];
