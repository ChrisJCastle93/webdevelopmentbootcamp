var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");

var seeds = [
    {
        name: "Banff", 
        image: "https://25.media.tumblr.com/4af7dc30780794c27dc8624deb3bc295/tumblr_n32jjl037z1s3ggdno4_1280.jpg",
        imageId: "001",
        description: "Towering like giant castles in the sky, the mountains of Banff provide endless opportunities for wildlife-watching, hiking, boating, climbing, mountain biking, skiing or simply communing with nature. Rugged canyons compete for your attention with lush fields of alpine wildflowers, jewel-like blue-green lakes and dense emerald forests. Created in 1885 and ranging over 6641 sq km, Banff is the world's third-oldest national park – and was Canada's first.",
        price: "30",
        location: "Banff, Alberta",
        lat: "51.1784",
        lng: "-115.5708",
        author: {
            id: "5f6d336588eadb6568b76730",
            username: "chris"
        },
        rating: 5
    },
    {
        name: "Gros Morne", 
        image: "https://cdn.familyfuncanada.com/wp-content/uploads/2015/04/Gros-Morne-NP-Credit-Parks-Canada-Dale-Wilson.jpg",
        imageId: "002",
        description: "The stunning flat-top mountains and deeply incised waterways of this national park are simply supernatural playgrounds. Designated a World Heritage Site in 1987, the park offers special significance to geologists as a blueprint for the planet. The bronze-colored Tablelands feature rock from deep within the earth's crust, supplying evidence for theories such as plate tectonics. Nowhere else in the world is such material as easily accessed as it is in Gros Morne.",
        price: "45",
        location: "Gros Morne National Park",
        lat: "49.6520",
        lng: "-57.7558",
        author: {
            id: "5f6d336588eadb6568b76730",
            username: "chris"
        },
        rating: 4
    },
    {
        name: "Algonquin", 
        image: "https://i.redd.it/gotakmp5ugz01.jpg",
        imageId: "003",
        description: "Established in 1893, Ontario's oldest and second-largest park is a sight for city-sore eyes, with over 7600 sq km of thick pine forests, jagged cliffs, trickling crystal streams, mossy bogs and thousands (thousands!) of lakes. An easily accessible outdoor gem, this rugged expanse is a must-visit for canoeists, hikers and seekers of piney fresh air.",
        price: "20",
        location: "Algonquin Provincial Park",
        lat: "45.8372",
        lng: "-78.3791",
        author: {
            id: "5f6d336588eadb6568b76730",
            username: "chris"
        },
        rating: 2
    },
    {
        name: "Jasper", 
        image: "https://az837918.vo.msecnd.net/publishedimages/articles/1739/en-CA/images/1/10-ways-to-experience-jasper-at-night-L-6.jpg",
        imageId: "004",
        description: "In a modern world of clamorous cities and ubiquitous social media, Jasper seems like the perfect antidote. Who needs a shrink when you’ve got Maligne Lake? What use is Facebook when you’re a two-day hike from the nearest road? And how can you possibly describe the Athabasca Glacier in a 140-character tweet?",
        price: "30",
        location: "Jasper National Park, Alberta",
        lat: "52.8734",
        lng: "-117.9543",
        author: {
            id: "5f6d336588eadb6568b76730",
            username: "chris"
        },
        rating: 5
    },
];

var seedcomments = [
    {
        text: "This place is great, but I wish there was internet",
        createdAt: {type: Date, default: Date.now},
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: "Homer"
        }
    }
];

async function seedDB(){
    try {
        await Campground.deleteMany({});
        // await Comment.deleteMany({});
        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            // let comment = await Comment.create(
            //     {
            //         text: 'This place is great, but I wish there was internet',
            //         author: {id: String, username: "Homer"}// "Homer" //NEED TO WORK OUT HOW TO SEED A USERNAME HERE
            //     }
            // )
            // let comment = await Comment.create(seedcomments);
            // campground.comments.push(comment);
            campground.save();
        }
    } catch(err) {
        console.log(err);
    }
}
module.exports = seedDB;