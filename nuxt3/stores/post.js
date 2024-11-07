import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("post", () => {
  const Posts = ref([
    {
      id: 1,
      title:
        "Eksplorasi Keindahan Tersembunyi: Pantai Ngerumput di Gunung Kidul",
      subTitle:
        "Nama 'Ngerumput' diambil dari fenomena alam yang unik di pantai ini. Di sepanjang pantai, Anda akan menemukan rerumputan hijau yang menjulang tinggi",
      slug: "pantai-ngerumput-gunung-kidul",
      author: "Berkelana.com",
      date: "Jumat, 1 Maret 2024",
      content:
        "<p class='mb-5'>Pantai Parangtritis, salah satu destinasi ikonik di Jogja, menawarkan kombinasi yang sempurna antara keindahan alam yang memukau dan nuansa mistis yang memikat. Terletak sekitar 27 kilometer selatan Yogyakarta, pantai ini telah menjadi tempat favorit bagi wisatawan lokal maupun mancanegara untuk menikmati keindahan pantai, ombak yang menggulung, dan berbagai aktivitas seru.</p> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Keindahan Alam yang Memukau</h3> <p>Saat tiba di Pantai Parangtritis, Anda akan disambut oleh panorama alam yang memukau. Pasir putih yang halus, hamparan biru laut yang luas, dan langit yang cerah menciptakan pemandangan yang memesona. Hamparan pasir yang luas juga menjadi tempat yang sempurna untuk bersantai sambil menikmati angin laut yang segar.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Aktivitas Seru dan Menantang</h3> <p>Selain menikmati keindahan alamnya, Pantai Parangtritis juga menawarkan berbagai aktivitas seru. Para pengunjung dapat menikmati naik delman atau kuda, berkeliling pantai sambil menikmati angin laut yang menyegarkan. Bagi yang suka tantangan, menyewa ATV untuk melintasi pasir pantai adalah pilihan yang menarik.</p> <p>Bagi para pecinta olahraga air, Pantai Parangtritis juga merupakan tempat yang ideal untuk surfing. Ombak yang tinggi dan kuat di pantai ini menarik para peselancar dari berbagai penjuru dunia. Namun, bagi yang ingin menikmati ombak tanpa perlu surfing, bermain air di pinggir pantai juga tidak kalah seru.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Mistis dan Mitos</h3> <p>Namun, keistimewaan Pantai Parangtritis tidak hanya terletak pada keindahan alamnya. Pantai ini juga dikenal karena kisah-kisah mistis dan mitos yang melekat di sekitarnya. Konon, Pantai Parangtritis dipercaya sebagai tempat kediaman Nyi Roro Kidul, ratu laut dalam mitologi Jawa. Banyak orang yang percaya bahwa melangkah terlalu jauh ke laut atau mengenakan warna hijau di pantai ini dapat memancing kemarahan Nyi Roro Kidul.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Tips Perjalanan</h3> <p>Sebelum mengunjungi Pantai Parangtritis, pastikan untuk membawa perlengkapan yang sesuai seperti tabir surya, topi, dan air minum. Selalu perhatikan tanda-tanda keamanan dan ikuti instruksi dari petugas pantai. Juga, jangan lupa untuk menghormati tempat-tempat suci dan tradisi lokal yang ada di sekitar pantai.</p></div>",
      category: "pantai",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31596.938614569222!2d110.56252415682812!3d-8.140382230926589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bba436390823f%3A0x142d3b53f187012b!2sPantai%20Ngrumput!5e0!3m2!1sid!2sid!4v1709381295052!5m2!1sid!2sid",
      primaryImage: "blog-5.jpg",
      galleryImage: ["blog-1.jpg", "blog-2.jpg", "blog-3.jpg", "blog-4.jpg"],
    },
    {
      id: 2,
      title:
        "Menggoda Lidah dengan Kelezatan Sate Klatak: Sensasi Kuliner Khas Yogyakarta",
      subTitle:
        "Kuliner Yogyakarta yang menggiurkan, Sate Klatak menonjol sebagai salah satu hidangan yang paling menarik perhatian. Dengan cita rasa yang khas dan pengalaman makan yang unik, sate ini telah menjadi ikon kuliner yang tidak boleh dilewatkan bagi para pencinta masakan Indonesia.",
      slug: "sate-klatak-yogyakarta",
      author: "Berkelana.com",
      date: "Jumat, 1 Maret 2024",
      content:
        "<p class='mb-5'>Di antara kekayaan kuliner Yogyakarta yang menggiurkan, Sate Klatak menonjol sebagai salah satu hidangan yang paling menarik perhatian. Dengan cita rasa yang khas dan pengalaman makan yang unik, sate ini telah menjadi ikon kuliner yang tidak boleh dilewatkan bagi para pencinta masakan Indonesia.</p> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Sejarah yang Melegenda</h3> <p>Sate Klatak memiliki sejarah yang menarik yang berawal dari kisah pedagang kaki lima di kota Yogyakarta. Dikatakan bahwa sate ini pertama kali disajikan oleh para penjual kaki lima yang menggunakan sepeda tua (klatak) sebagai tempat untuk memasak sate mereka. Nama 'Klatak' sendiri berasal dari bunyi sepeda tua yang berderit saat dipedalankan.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Proses Pembuatan yang Unik</h3> <p>Salah satu hal yang membuat Sate Klatak begitu istimewa adalah proses pembuatannya yang unik. Potongan daging kambing atau daging sapi yang telah dibumbui dengan racikan rempah-rempah khas dimasukkan ke dalam rangka besi dan dipanggang di atas bara api dengan cara yang unik. Para penjual menggunakan sepeda tua untuk menggerakkan rangka besi tersebut, memberikan sentuhan tradisional pada proses memasaknya.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Cita Rasa yang Menggugah Selera</h3> <p>Sate Klatak memiliki cita rasa yang khas dan menggugah selera. Daging yang dipanggang dengan sempurna menghasilkan aroma yang harum dan tekstur yang lembut. Racikan bumbu rempah yang digunakan untuk memarini daging memberikan rasa yang kaya dan nikmat pada setiap gigitannya. Disajikan dengan lontong, bawang goreng, dan sambal khas, Sate Klatak akan memanjakan lidah Anda dengan cita rasa yang tak terlupakan.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Tempat Makan yang Seru</h3> <p>Menikmati Sate Klatak bukan hanya sekedar soal mencicipi hidangan lezat, tetapi juga tentang pengalaman makan yang seru. Para penjual Sate Klatak biasanya menyiapkan meja-meja kecil di pinggir jalan atau di warung-warung kaki lima yang ramai, menciptakan atmosfer yang hidup dan meriah. Anda dapat menikmati sate ini sambil berbincang dengan teman-teman atau menikmati keramaian jalanan Yogyakarta.</p></div>",
      category: "kuliner",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31596.938614569222!2d110.56252415682812!3d-8.140382230926589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bba436390823f%3A0x142d3b53f187012b!2sPantai%20Ngrumput!5e0!3m2!1sid!2sid!4v1709381295052!5m2!1sid!2sid",
      primaryImage: "blog-13.jpg",
      galleryImage: ["blog-13.jpg", "blog-14.jpg", "blog-15.jpg", "blog-12.jpg"],
    },
    {
      id: 3,
      title:
        "Eksplorasi Kekuatan Spiritual dan Arsitektur Megah: Candi Prambanan",
      subTitle:
        "Candi Prambanan, sebuah keajaiban arsitektur abad ke-9 di Yogyakarta, Indonesia, adalah salah satu situs warisan dunia UNESCO yang paling mengesankan.",
      slug: "cerita-candi-prambanan",
      author: "Berkelana.com",
      date: "Minggu, 3 Maret 2024",
      content:
        "<p class='mb-5'>Candi Prambanan, sebuah keajaiban arsitektur abad ke-9 di Yogyakarta, Indonesia, adalah salah satu situs warisan dunia UNESCO yang paling mengesankan. Terletak sekitar 17 kilometer dari pusat kota Yogyakarta, candi ini menjadi tujuan wisata unggulan bagi para pecinta sejarah, arsitektur, dan spiritualitas.</p> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Keindahan Arsitektur</h3> <p>Dikenal sebagai salah satu contoh arsitektur Hindu terbesar di Asia Tenggara, Candi Prambanan menampilkan kemegahan dan keindahan yang memukau. Terdiri dari tiga candi utama yang diapit oleh 224 candi kecil, kompleks ini menampilkan relief-relief indah yang menggambarkan kisah-kisah epik Hindu seperti Ramayana dan Mahabharata. Setiap detil ukiran batu candi memancarkan keahlian seni yang luar biasa, mengingatkan kita akan masa kejayaan peradaban Hindu di Jawa.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Kekuatan Spiritual</h3> <p>Candi Prambanan tidak hanya merupakan sebuah monumen arsitektur, tetapi juga sebuah tempat ibadah yang penting bagi umat Hindu. Dalam kompleksnya, terdapat tiga candi utama yang didedikasikan untuk Trimurti Hindu: Brahma, Wisnu, dan Siwa. Para peziarah datang dari berbagai penjuru untuk bersembahyang dan memohon berkah di kuil-kuil ini. Suasana keheningan yang khas di sekitar candi memperkuat kehadiran spiritual yang kuat, mengundang.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Pengalaman Wisata</h3> <p>Selain keindahan arsitektur dan kekuatan spiritualnya, Candi Prambanan menawarkan berbagai pengalaman wisata yang menarik. Pengunjung dapat menikmati pertunjukan tari Ramayana yang spektakuler di teater terbuka di dekat candi, menambah keunikan dan keindahan pengalaman mereka. Di samping itu, area sekitar candi juga menawarkan tempat piknik yang nyaman bagi keluarga dan teman-teman untuk menikmati suasana yang damai dan tenang.</p></div> </div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Tips Perjalanan</h3> <p>Sebelum mengunjungi Candi Prambanan, pastikan untuk membawa perlengkapan yang sesuai seperti topi, kacamata hitam, dan air minum karena cuaca di daerah tersebut bisa sangat panas terutama pada siang hari. Juga, perhatikan aturan dan etika saat berada di dalam kompleks candi untuk menjaga keamanan dan kenyamanan bersama. </p></div>",
      category: "budaya",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.3559337544734!2d110.48889247500459!3d-7.752020592266873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5ae3dbd859d1%3A0x19e7a03b25955a2d!2sCandi%20Prambanan!5e0!3m2!1sid!2sid!4v1709467003262!5m2!1sid!2sid",
      primaryImage: "blog-7.jpg",
      galleryImage: ["blog-8.jpg", "blog-2.jpg", "blog-3.jpg", "blog-5.jpg"],
    },
    {
      id: 4,
      title:
        "Mengungkap Keindahan Kampung Wisata Tamansari: Pernapasan Kehidupan Tradisional Yogyakarta",
      subTitle:
        "Dalam jantung Yogyakarta, tersembunyi suatu tempat yang menjadi saksi bisu sejarah dan kehidupan tradisional: Kampung Wisata Tamansari. Sebuah destinasi yang memikat dengan keelokan alam dan kehangatan budaya.",
      slug: "keindahan-kampung-wisata-tamansari",
      author: "Berkelana.com",
      date: "Sabtu, 2 Maret 2024",
      content:
        "<p class='mb-5'>Dalam jantung Yogyakarta, tersembunyi suatu tempat yang menjadi saksi bisu sejarah dan kehidupan tradisional: Kampung Wisata Tamansari. Sebuah destinasi yang memikat dengan keelokan alam dan kehangatan budaya, Tamansari tidak sekadar sebuah tempat, tapi sebuah pengalaman yang mengajak kita merasakan keajaiban keseharian para penduduknya.</p> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Menelusuri Sejarah yang Memukau</h3> <p>Tamansari, secara harfiah bermakna 'taman yang indah', tidak hanya memikat dengan keindahan alamnya tetapi juga kekayaan sejarahnya. Kampung ini berdiri di atas tanah yang pernah menjadi bagian dari kompleks Keraton Yogyakarta, kompleks kerajaan yang megah dan sarat dengan cerita masa lalu. Dibangun oleh Sultan Hamengkubuwono I pada abad ke-18, Tamansari dahulu berfungsi sebagai taman air keraton yang menjadi tempat rekreasi dan kegiatan spiritual bagi keluarga kerajaan.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Menyelami Kehidupan Lokal yang Berwarna</h3> <p>Namun, jangan kira Tamansari hanya tentang sejarah yang kuno. Kampung ini juga menjadi jendela bagi kita untuk merasakan kehidupan lokal yang berwarna. Di antara rumah-rumah joglo khas Jawa yang mempesona, Anda akan menemukan keramahan dan kehangatan masyarakat setempat yang ramah serta senang berbagi kisah tentang kehidupan sehari-hari.</p> </div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Merasakan Seni dan Budaya yang Otentik</h3> <p>Kampung Wisata Tamansari juga menawarkan beragam kegiatan yang memperkaya pengalaman wisatawan. Mulai dari menyaksikan pertunjukan seni tradisional seperti wayang kulit, tari Jawa, hingga les tari dan musik tradisional Jawa. Anda juga dapat belajar langsung bagaimana membuat batik, salah satu warisan budaya yang penting di Jawa, atau mencoba keterampilan membuat kerajinan tangan dari bambu dan anyaman.</p></div> </div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Tips Perjalanan</h3> <p>Sebelum mengunjungi Kampung Wisata Tamansari, pastikan untuk mengenakan pakaian yang sopan dan santun, menghormati tradisi lokal. Juga, jangan ragu untuk berinteraksi dengan penduduk setempat, mereka senang berbagi cerita dan pengalaman dengan pengunjung.</p></div>",
      category: "budaya",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.807690381594!2d110.3567358750052!3d-7.81017204221028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5793d0c2cf2b%3A0x276a21f8a01cbe13!2sKampung%20Wisata%20Taman%20Sari!5e0!3m2!1sid!2sid!4v1709469291493!5m2!1sid!2sid",
      primaryImage: "blog-9.jpg",
      galleryImage: ["blog-9.jpg", "blog-10.jpg", "blog-11.jpg", "blog-12.jpg"],
    },
    {
      id: 5,
      title: "Eksplorasi Keindahan Alam dan Mitos di Pantai Parangtritis",
      subTitle:
        "Pantai Parangtritis, salah satu destinasi ikonik di Jogja, menawarkan kombinasi yang sempurna antara keindahan alam yang memukau dan nuansa mistis yang memikat",
      slug: "cerita-pantai-parangtritis",
      author: "Berkelana.com",
      date: "Sabtu, 2 Maret 2024",
      content:
        "<p class='mb-5'>Pantai Parangtritis, salah satu destinasi paling terkenal di Yogyakarta, menawarkan kombinasi yang unik antara keindahan alam yang memukau dan nuansa mistis yang memikat. Terletak sekitar 27 kilometer selatan Kota Yogyakarta, pantai ini telah menjadi tempat favorit bagi wisatawan lokal maupun mancanegara untuk menikmati keindahan pantai yang luar biasa dan menggali legenda dan mitos yang tersembunyi di baliknya.</p> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Pesona Alam yang Memikat</h3> <p>Tiba di Pantai Parangtritis, Anda akan disambut oleh panorama alam yang menakjubkan. Hamparan pasir putih yang luas, ombak yang menggulung dengan gemuruh, dan langit biru yang cerah menciptakan pemandangan yang tak terlupakan. Dikelilingi oleh tebing-tebing batu karang yang menjulang, pantai ini menawarkan pemandangan alam yang spektakuler.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Aktivitas Seru di Pantai</h3> <p>Selain menikmati keindahan alamnya, Pantai Parangtritis juga menawarkan berbagai aktivitas seru bagi pengunjungnya. Anda dapat menikmati naik delman atau kuda sambil menyusuri tepian pantai yang indah. Bagi yang suka tantangan, menyewa ATV untuk melintasi hamparan pasir pantai dapat menjadi pengalaman yang menyenangkan.</p> <p>Bagi para penggemar olahraga air, Pantai Parangtritis adalah tempat yang ideal untuk berselancar. Ombak yang tinggi dan kuat menarik peselancar dari berbagai penjuru dunia. Namun, untuk yang lebih santai, Anda dapat menikmati berenang atau bermain air di tepi pantai.</p></div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Mitos dan Legenda yang Menyelimuti</h3> <p>Pantai Parangtritis juga dikenal karena kisah-kisah mistis dan mitos yang menyelimutinya. Konon, pantai ini adalah kediaman Nyi Roro Kidul, ratu laut dalam mitologi Jawa. Banyak orang yang percaya bahwa melangkah terlalu jauh ke laut atau mengenakan warna hijau di pantai ini dapat memancing kemarahan Nyi Roro Kidul.</p></div> </div> <div class='mb-5'><h3 class='font-semibold mb-1.5'>Tips Perjalanan</h3> <p>Sebelum mengunjungi Pantai Parangtritis, pastikan untuk membawa perlengkapan yang sesuai seperti tabir surya, topi, dan air minum. Selalu ikuti tanda-tanda keamanan yang ada di pantai dan jangan lupa untuk menghormati tempat-tempat suci dan tradisi lokal yang ada di sekitarnya.</p></div>",
      category: "pantai",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31605.94856886912!2d110.28980228360906!3d-8.025354970801866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7b00975eac533d%3A0x351bfe1453e22e36!2sPantai%20Parangtritis!5e0!3m2!1sid!2sid!4v1709467071241!5m2!1sid!2sid",
      primaryImage: "blog-6.jpg",
      galleryImage: ["blog-4.jpg", "blog-3.jpg", "blog-2.jpg", "blog-1.jpg"],
    },
  ]);
  const Post = ref({});

  const filterPostBySlug = (slug) => {
    const post = Posts.value.find((post) => post.slug === slug);
    post ? (Post.value = post) : (Post.value = 404);
  };

  return {
    Posts,
    Post,
    filterPostBySlug,
  };
});
