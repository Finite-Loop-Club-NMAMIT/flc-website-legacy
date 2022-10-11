// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
const prisma = new PrismaClient();

export default async function handler(req, res) {

  // let m = members.filter((v, i, a) => a.findIndex(t => (t.usn === v.usn)) === i)


  // let arr = m.map((member) => {
  //   return {
  //     name: member.name,
  //     email: member.usn.toLowerCase().trim() + '@nmamit.in',
  //     batch: Number(member.usn.slice(3, 5)) + 4,
  //   }
  // })
  // console.log(arr)

  // const data = await prisma.members.createMany({
  //   data: arr
  // })

  return res.status(200).json({ name: 'John Doe' })
}
const members = [
  {
    "name": "Deon Xavier Pereira ",
    "usn": "4NM21AI023"
  },
  {
    "name": "Gagan G Nayak ",
    "usn": "4nm20cs072"
  },
  {
    "name": "Nihal Mohan ",
    "usn": "4NM21AI045"
  },
  {
    "name": "SAAKSHI B DEVADIGA ",
    "usn": "4nm21ee071"
  },
  {
    "name": "Kartik",
    "usn": "4NM20CS091"
  },
  {
    "name": "CHETHANA R KINI",
    "usn": "4NM21AI018"
  },
  {
    "name": "Minal Assadi",
    "usn": "4NM21AI040 "
  },
  {
    "name": "Saachi Suvarna",
    "usn": "4nm21ai061"
  },
  {
    "name": " Mesha Shetty ",
    "usn": "4NM21AI039"
  },
  {
    "name": "Ashwini.M",
    "usn": "4NM21CM011"
  },
  {
    "name": "Manasa S ",
    "usn": "4NM21CS086"
  },
  {
    "name": "Ashish Shankar ",
    "usn": "4nm21ec024"
  },
  {
    "name": "A.Prashasthi Shetty",
    "usn": "4NM21CS001"
  },
  {
    "name": "Pratham S Shetty",
    "usn": "4NM21CS114"
  },
  {
    "name": "Shreshta M S",
    "usn": "4NM21CM050"
  },
  {
    "name": "Preetham",
    "usn": "4NM21EC102"
  },
  {
    "name": "K Anoop Shenoy",
    "usn": "4nm21ai031"
  },
  {
    "name": "Deepika",
    "usn": "4nm21cs052"
  },
  {
    "name": "Shreyas S Saunshi",
    "usn": "4NM21EC140"
  },
  {
    "name": "Shashank B N",
    "usn": "4nm21cs150"
  },
  {
    "name": "Kavya Hegdekatte",
    "usn": "4NM21CM027"
  },
  {
    "name": "Mladen Saldanha ",
    "usn": "4nm21cs088"
  },
  {
    "name": "Aniruddha Upadhya K",
    "usn": "4NM21EC018"
  },
  {
    "name": "Uditaparna Sarmah ",
    "usn": "4nm21ec173"
  },
  {
    "name": "Pratham Gurudatta Shetty",
    "usn": "4nm21is109"
  },
  {
    "name": "GANESH NAYAK",
    "usn": "4NM21CS063 "
  },
  {
    "name": "Neha alva",
    "usn": "4nm21ri028"
  },
  {
    "name": "Sinchana. S. H",
    "usn": "4NM21RI047"
  },
  {
    "name": "Harshit Raj ",
    "usn": "4NM21AI029"
  },
  {
    "name": "Surbhi Tagare ",
    "usn": "4NM21CS180"
  },
  {
    "name": "Vaishnavi Prabhu ",
    "usn": "4NM21CS200"
  },
  {
    "name": "Sushma k bhat",
    "usn": "4nm21is188"
  },
  {
    "name": "Shawn Salis",
    "usn": "4nm21cs035"
  },
  {
    "name": "Manish V Shetty ",
    "usn": "4NM21IS079"
  },
  {
    "name": "Taksheel shetty ",
    "usn": "4nm21cs187"
  },
  {
    "name": "Akash. A. Bhandary ",
    "usn": "4nm20is400"
  },
  {
    "name": "Sahana M K",
    "usn": "4nm21cs135"
  },
  {
    "name": "Vedhanth S Shetty",
    "usn": "4nm21is205@nmamit.in"
  },
  {
    "name": "Chaitrali Bala Mahale",
    "usn": "4nm20is403"
  },
  {
    "name": "Shweta Sanjay",
    "usn": "4nm20cs179 "
  },
  {
    "name": "Vyalin Braganza ",
    "usn": "4NM21CM065 "
  },
  {
    "name": "Akshata",
    "usn": "4NM21CS011"
  },
  {
    "name": "Shishir c shetty",
    "usn": "4nm21cs153"
  },
  {
    "name": "Satvik S Nayak",
    "usn": "4NM20CS157"
  },
  {
    "name": "ASHITH K",
    "usn": "4NM21CM010"
  },
  {
    "name": "Rupali Behera ",
    "usn": "4NM21CS131"
  },
  {
    "name": "Lavya u bangera ",
    "usn": "4nm21cs084"
  },
  {
    "name": "Hrithika ",
    "usn": "4NM21CS069"
  },
  {
    "name": "Ganapathi ",
    "usn": "4NM21EC051"
  },
  {
    "name": "Ashwin Raj K R ",
    "usn": "4nm21ec026"
  },
  {
    "name": "Sona A.R",
    "usn": "4NM21CS166"
  },
  {
    "name": "Pratheeksha k n ",
    "usn": "4NM21IS111"
  },
  {
    "name": "Vaishnavi P Shet ",
    "usn": "4NM21CS199"
  },
  {
    "name": "Srivatsa R Upadhya",
    "usn": "4NM21CS171"
  },
  {
    "name": "Samipthi Dinesh Nayak ",
    "usn": "4nm21cs141"
  },
  {
    "name": "Jaideep Yogish ",
    "usn": "4nm21is057"
  },
  {
    "name": "Kshitij Shetty ",
    "usn": "4nm21is069"
  },
  {
    "name": "Abdullah Anwar Assadi ",
    "usn": "4nm21ee001"
  },
  {
    "name": "K VEDAVYAS Shenoy",
    "usn": "4nm21is062"
  },
  {
    "name": "Fathima Thaskeen",
    "usn": "4NM21CS060"
  },
  {
    "name": "U Akash Shenoy",
    "usn": "4NM21EC172 "
  },
  {
    "name": "PREETHAM U ",
    "usn": "4NM21IS114"
  },
  {
    "name": "Kshitiz mangal ",
    "usn": "4NM21CS082"
  },
  {
    "name": "Shivani Pai ",
    "usn": "4NM21IS158 "
  },
  {
    "name": "Siddharth Chadachal",
    "usn": "4nm21is170"
  },
  {
    "name": "Karthik",
    "usn": "4NM21CS077"
  },
  {
    "name": "Vivek Kumar ",
    "usn": "4nm21cs210"
  },
  {
    "name": "K Tejas Pai",
    "usn": "4nm21cm024"
  },
  {
    "name": "Swastik kumar pati",
    "usn": "4nm21is190"
  },
  {
    "name": "Nireeksha",
    "usn": "4nm21is096"
  },
  {
    "name": "Nihal Anchan",
    "usn": "4NM21CM036"
  },
  {
    "name": "Kavya Hegde ",
    "usn": "4nm21cm026"
  },
  {
    "name": "Pranam P Kotian",
    "usn": "4NM21AI049"
  },
  {
    "name": "Prajwal Kumatagi",
    "usn": "4NM21CS109"
  },
  {
    "name": "Nerajaksharaju N A",
    "usn": "4nm21cs095"
  },
  {
    "name": "Thanisha ",
    "usn": "4NM21IS192"
  },
  {
    "name": "Prathiksha",
    "usn": "4nm21ec100"
  },
  {
    "name": "M Rakshitha Prabhu ",
    "usn": "4nm21is071"
  },
  {
    "name": "Anirudh Karanth",
    "usn": "4nm21cs026"
  },
  {
    "name": "Satwik R Prabhu ",
    "usn": "4NM21CS143"
  },
  {
    "name": "Anagha Rao ",
    "usn": "4NM21IS016"
  },
  {
    "name": "Gurudatt mallya",
    "usn": "4nm21is048"
  },
  {
    "name": "Vikram Pai",
    "usn": "4NM21RI054"
  },
  {
    "name": "Priyanka Mallya ",
    "usn": "4nm21is117"
  },
  {
    "name": "Preethi H S",
    "usn": "4NM21AI054"
  },
  {
    "name": "Navyashree ",
    "usn": "4nm21is093"
  },
  {
    "name": "Manaswi",
    "usn": "4nm21is077"
  },
  {
    "name": "Kishor S Naik",
    "usn": "4NM21IS068"
  },
  {
    "name": "Varun S Amin",
    "usn": "4NM21IS204"
  },
  {
    "name": "Vishal Singh",
    "usn": "4NM21IS211"
  },
  {
    "name": "Pratham G N",
    "usn": "4NM21IS107"
  },
  {
    "name": "Vandana Prabhu",
    "usn": "4NM21CS201"
  },
  {
    "name": "Sinchana ",
    "usn": "4NM21IS171"
  },
  {
    "name": "Dhanya",
    "usn": "4NM21CS055"
  },
  {
    "name": "Meghana Rao",
    "usn": "4NM21RI018"
  },
  {
    "name": "Rakshitha M",
    "usn": "4nm21is121"
  },
  {
    "name": "Vaishnavi Pai ",
    "usn": "4NM21RI053"
  },
  {
    "name": "SINCHANA C POOJARY",
    "usn": "4NM21CS163"
  },
  {
    "name": "Vasishta p m",
    "usn": "4nm21cs205"
  },
  {
    "name": "Shashank B",
    "usn": "4NM21IS152"
  },
  {
    "name": "Shreyas B G ",
    "usn": "4NM21IS161"
  },
  {
    "name": "N S Samartha",
    "usn": "4NM21CS092"
  },
  {
    "name": "Akshita ",
    "usn": "4NM21CS015"
  },
  {
    "name": "WRITVAN GHOSH ",
    "usn": "4NM21CS213"
  },
  {
    "name": "Nishanth",
    "usn": "4NM21CS101"
  },
  {
    "name": "Sahana",
    "usn": "4nm21is129"
  },
  {
    "name": "Sahil Kambli",
    "usn": "4NM21IS130"
  },
  {
    "name": "Bindiya K",
    "usn": "4NM21CM014"
  },
  {
    "name": "Aprameya P Bhat ",
    "usn": "4NM21CS032"
  },
  {
    "name": "Adithya Rao K",
    "usn": "4NM21CS004"
  },
  {
    "name": "Ameeth Manoj Bhuvanapalli ",
    "usn": "4NM21CS044"
  },
  {
    "name": "Gehena H Shetty",
    "usn": "4NM21CS064"
  },
  {
    "name": "SHARAN S SHETTY",
    "usn": "4NM21IS149"
  },
  {
    "name": "Srujan Acharya",
    "usn": "4nm21cs172"
  },
  {
    "name": "T Tushar Shenoy ",
    "usn": "4NM21EC167"
  },
  {
    "name": "Uttam K",
    "usn": "4nm21is197"
  },
  {
    "name": "Jayden Fernandes ",
    "usn": "4NM21IS059"
  },
  {
    "name": "Swapnil Sharma",
    "usn": "4NM21EC161"
  },
  {
    "name": "Aditya Singh",
    "usn": "4NM21IS008"
  },
  {
    "name": "HITHA K",
    "usn": "4NM21CS067"
  },
  {
    "name": "Sourabh Shenoy",
    "usn": "4NM21EC147"
  },
  {
    "name": "Srilaxmi ",
    "usn": "4NM21CS169"
  },
  {
    "name": "Sharanya Shetty",
    "usn": "4NM21CS148"
  },
  {
    "name": "Aaron Nazareth ",
    "usn": "4nm21cm003"
  },
  {
    "name": "Apeksha S Shetty ",
    "usn": "4nm21cs031"
  },
  {
    "name": "Manya Hegde",
    "usn": "4nm21ai038"
  },
  {
    "name": "Sanvi",
    "usn": "4NM21IS141"
  },
  {
    "name": "Rashmi",
    "usn": "4NM21EC115"
  },
  {
    "name": "ananya nagraj",
    "usn": "4NM21CS023"
  },
  {
    "name": "K Sanjana Shetty",
    "usn": "4NM21CS074"
  },
  {
    "name": "Shishir shetty",
    "usn": "4nm21cs153"
  },
  {
    "name": "Adithi Shenoy",
    "usn": "4NM21IS060"
  },
  {
    "name": "Shriskanda P Bhat",
    "usn": "4nm21cs157"
  },
  {
    "name": "Supreetha Nayak",
    "usn": "4NM21CS178"
  },
  {
    "name": "Amarendra kumar singh",
    "usn": "4nm21ec010"
  },
  {
    "name": "SHRAVYA K",
    "usn": "4NM21CS156"
  },
  {
    "name": "PRAJWAL ",
    "usn": "4NM21EC095"
  },
  {
    "name": "Aditya C Shekhar",
    "usn": "4nm21IS007"
  },
  {
    "name": "Shreya ",
    "usn": "4nm21ec136"
  },
  {
    "name": "Shetty Anushka ",
    "usn": "4nm20cs167"
  },
  {
    "name": "Valeska Joshna Dsouza",
    "usn": "4nm20cs207"
  },
  {
    "name": "Prathama S J ",
    "usn": "4NM21CS115"
  },
  {
    "name": "Preethesh kumar",
    "usn": "4nm21cm039"
  },
  {
    "name": "Nitin Raj",
    "usn": "4nm21is098"
  },
  {
    "name": "Darshan Salian",
    "usn": "4NM21IS040"
  },
  {
    "name": "Avani Acharya",
    "usn": "4NM21CS039"
  },
  {
    "name": "P. Alekhya ",
    "usn": "4NM21IS100"
  },
  {
    "name": "Shanelle Dmello",
    "usn": "4nm20cs161"
  },
  {
    "name": "Pratham Ganji",
    "usn": "4NM21IS108"
  },
  {
    "name": "Prajwal P",
    "usn": "4NM21IS105"
  },
  {
    "name": "B Atul V Pai",
    "usn": "4nm21ee014"
  },
  {
    "name": "S P Pratham",
    "usn": "4NM21AI060"
  },
  {
    "name": "Sushanth R Hegde",
    "usn": "4nm21is187"
  },
  {
    "name": "Anuj Pai",
    "usn": "4nm21ee009"
  },
  {
    "name": "Ananya Pai",
    "usn": "4NM21CS024"
  },
  {
    "name": "Hemanth Bhat",
    "usn": "4nm21is090"
  },
  {
    "name": "Nishchith G P",
    "usn": "4nm21ec092"
  },
  {
    "name": "Arpitha T ",
    "usn": "4NM20CS040"
  },
  {
    "name": "Shetty Ritesh Rajaram ",
    "usn": "4NM20IS136"
  },
  {
    "name": "Vinayak Kumar ",
    "usn": "4NM21IS208"
  },
  {
    "name": "Sneha R Kini",
    "usn": "4nm20cs181"
  },
  {
    "name": "Kushi shetty ",
    "usn": "4nm20cs099 "
  },
  {
    "name": "Gahana Shetty",
    "usn": "4NM21CS062"
  },
  {
    "name": "Adithi Ram",
    "usn": "4nm21ai002"
  },
  {
    "name": "Shaina Jyothica Crasta",
    "usn": "4nm20cs160"
  },
  {
    "name": "Shubham tyagi",
    "usn": "4nm21is166"
  },
  {
    "name": "Pavithra V",
    "usn": "4NM21IS103"
  },
  {
    "name": "Akshatha Shettihar N",
    "usn": "4nm21cv004"
  },
  {
    "name": "Akshatha",
    "usn": "4nm21ai009"
  },
  {
    "name": "Samarth Baliga",
    "usn": "4NM21CS138"
  },
  {
    "name": "Arvin fernandes ",
    "usn": "4nm21ee011"
  },
  {
    "name": "Raksha Kamath",
    "usn": "4nm20cs143"
  },
  {
    "name": "Rajath Kumar j",
    "usn": "4NM21ME040"
  },
  {
    "name": "SHARWIN LESTON MENDONCA",
    "usn": "4NM21CS149"
  },
  {
    "name": "Priyamshu mk",
    "usn": "4nm21cs121"
  },
  {
    "name": "SAATHWIK S SHETTY",
    "usn": "4NM21ME042 "
  },
  {
    "name": "Arshad Sheikh",
    "usn": "4nm21cs033"
  },
  {
    "name": "Shefali A R",
    "usn": "4nm21is154"
  },
  {
    "name": "Sudhiksha G S ",
    "usn": "4NM21IS182"
  },
  {
    "name": "BHARAT RAMA NAIK",
    "usn": "4NM21IS034"
  },
  {
    "name": "Rohan M P",
    "usn": "4NM21CS128"
  },
  {
    "name": "Parinitha ",
    "usn": "4NM21IS101"
  },
  {
    "name": "Tejas D Rao",
    "usn": "4nm21cs188 "
  },
  {
    "name": "Deepshika Poojary",
    "usn": "4NM21AI022"
  },
  {
    "name": "Navaraj D Shetty",
    "usn": "4nm21cs094"
  },
  {
    "name": "Roshan",
    "usn": "4nm21cs130"
  },
  {
    "name": "Nibha Rajesh Belle ",
    "usn": "4nm21cs096"
  },
  {
    "name": "Mohammed Hasan Raza ",
    "usn": "4NM21IS084"
  },
  {
    "name": "Amar Yallappa Sanknnavar",
    "usn": "4NM21CS020"
  },
  {
    "name": "Keerthana",
    "usn": "4NM21CS078"
  },
  {
    "name": "ADITI S RAO",
    "usn": "4NM21AI004"
  },
  {
    "name": "Swaroop A Rao",
    "usn": "4NM21CS184"
  },
  {
    "name": "Hithanksha",
    "usn": "4NM21CS068"
  },
  {
    "name": "Mohammed Abid",
    "usn": "4nm21ri027"
  },
  {
    "name": "Sameeksha Shetty",
    "usn": "4nm21cs139"
  },
  {
    "name": "Samanwitha K",
    "usn": "4NM21CS137"
  },
  {
    "name": "Ankitha R",
    "usn": "4NM20CS035"
  },
  {
    "name": "Amoolya Jain",
    "usn": "4nm20cs025 "
  },
  {
    "name": "Amrutha Joshi",
    "usn": "4nm20cs026"
  },
  {
    "name": "Suryanshu Choudhary",
    "usn": "4NM21CS181"
  },
  {
    "name": "Sanjey V A",
    "usn": "4nm21cs197"
  },
  {
    "name": "Bhavana ",
    "usn": "4nm20cs051"
  },
  {
    "name": "Siddharth Kamath",
    "usn": "4NM21IS169"
  },
  {
    "name": "Pearl Menezes",
    "usn": "4NM21CS108"
  },
  {
    "name": "Kaushal Pratheek TP ",
    "usn": "4nm21ri024"
  },
  {
    "name": "Varun Naik",
    "usn": "4NM21CS204"
  },
  {
    "name": "Abhishek ",
    "usn": "4NM21IS004"
  },
  {
    "name": "shreyas pai atkere ",
    "usn": "4NM21IS163"
  },
  {
    "name": "Madhav Gaur",
    "usn": "4NM21IS073"
  },
  {
    "name": "Pradhyumna R Shetty",
    "usn": "4NM21RI030"
  },
  {
    "name": "Nidhi A Shetty",
    "usn": "4nm21cs097"
  },
  {
    "name": "Nihar Shaji",
    "usn": "4NM21CS099"
  },
  {
    "name": "AMRUTHA V",
    "usn": "4nm20cs027"
  },
  {
    "name": "Abhijith Hegde ",
    "usn": "4NM21IS002"
  },
  {
    "name": "Tushar Bhagat ",
    "usn": "4nm21cs194"
  },
  {
    "name": "Sinha Shruti Shashi",
    "usn": "4nm20cs180"
  },
  {
    "name": "Siddhant shah",
    "usn": "4nm21is168"
  },
  {
    "name": "Anvita D Shettigar ",
    "usn": "4nm21ai015"
  },
  {
    "name": "Krithi",
    "usn": "4NM21CS081"
  },
  {
    "name": "Mansi Dwivedi",
    "usn": "4NM21IS080"
  },
  {
    "name": "Srilaxmi ",
    "usn": "4NM21CM056"
  },
  {
    "name": "Dileep D Shetty ",
    "usn": "4NM21IS044"
  }
]
