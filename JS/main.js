var jacobGlobals = {
  imageData: [
    {
      archiveTitle: "Harry Potter",
      title: "Harry Potter and the Prisoner of Azkaban",
      name: "Harry Potter",
      description: "Expellifootus!",
      srcLo: "Harry Potter.jpg",
      img: undefined
    },
    {
      archiveTitle: "The Lord of the Rings",
      title: "The Fellowship of the Ring",
      name: "Gandalf the Grey",
      description: "On the Bridge of Khazad-foot.",
      srcLo: "Gandalf.jpg",
      img: undefined
    },
    {
      archiveTitle: "Titanic",
      title: "Titanic",
      name: "Rose DeWitt Bukater",
      description: "Before the Titanic crashed into a giant foot.",
      srcLo: "Titanic.jpg",
      img: undefined
    },
    {
      archiveTitle: "The Matrix",
      title: "The Matrix",
      name: "Neo",
      description: "There is no foot.",
      srcLo: "Matrix.jpg",
      img: undefined
    },
    {
      archiveTitle: "Star Wars",
      title: "Star Wars Episode VI: Return of the Jedi",
      name: "Luke Skywalker",
      description: "There is a great disturbance in the Foot.",
      srcLo: "Luke.jpg"
    },
    {
      archiveTitle: "Pokémon",
      title: "Pokémon: The First Movie",
      name: "Ash Ketchum",
      description: "It's super ef-foot-ctive!",
      srcLo: "Pokemon.jpg"
    },
    {
      archiveTitle: "Back to the Future",
      title: "Back to the Future",
      name: "Marty McFly",
      description: "With 1.21 gigafoots of electricity.",
      srcLo: "Back to the Future.jpg"
    },
    {
      archiveTitle: "Super Mario",
      title: "Super Mario Bros.",
      name: "Mario",
      description: "Thank you Mario! But our princess is on another foot!",
      srcLo: "Mario.jpg"
    },
    {
      archiveTitle: "The Prestige",
      title: "The Prestige",
      name: "Robert Angier",
      description:
        'That\'s why every magic trick has a third act, the hardest part. The part we call "The Foot."',
      srcLo: "Prestige.jpg"
    },
    {
      archiveTitle: "Toy Story",
      title: "Toy Story",
      name: "Sheriff Woody Pride",
      description: "There's a snake on my foot!",
      srcLo: "Woody.jpg"
    },
    {
      archiveTitle: "Jurassic Park",
      title: "Jurassic Park",
      name: "Dr. Alan Grant",
      description:
        "Using sophisticated techniques, they extract the preserved blood from the mosquito, and bingo: dino feet.",
      srcLo: "Jurassic Park.jpg"
    },
    {
      archiveTitle: "Dragonslayer",
      title: "Dragonslayer",
      name: "Galen Bradwarden",
      description:
        "Unclean foot! Get thee down! Be thou consumed by the fires that made thee!",
      srcLo: "Dragonslayer.jpg"
    },
    {
      archiveTitle: "The Gardener",
      title: "The Gardener",
      name: "By guest artist Beth Carpenter",
      description: "Foot by foot, row by row...",
      srcLo: "Gardener.jpg"
    }
  ]
};

function preloadImage(index) {
  // if index is out of bounds, wrap around
  if (index < 0) index = jacobGlobals.imageData.length - 1;
  else if (index > jacobGlobals.imageData.length - 1) index = 0;

  // if we've already loaded image, stop
  if (jacobGlobals.imageData[index].img != undefined) return;

  jacobGlobals.imageData[index].img = new Image();
  jacobGlobals.imageData[index].img.src =
    "./Images/" + jacobGlobals.imageData[index].srcLo;
  jacobGlobals.imageData[index].img.className = "tattooImage";
}

function initializeButtons() {
  document.getElementById("BackButton").addEventListener("click", function() {
    var index = parseInt(window.location.hash.substring(1)) - 1;

    if (index < 1) {
      index = jacobGlobals.imageData.length;
    }

    location.hash = index;
  });

  document
    .getElementById("ForwardButton")
    .addEventListener("click", function() {
      var index = parseInt(window.location.hash.substring(1)) + 1;

      if (index > jacobGlobals.imageData.length) {
        index = 1;
      }

      location.hash = index;
    });
}

function initializeHash() {
  if (window.location.hash === "") {
    window.location.hash = jacobGlobals.imageData.length;
  } else {
    var i = window.location.hash.substring(1);

    if (i < 1) {
      window.location.hash = 1;
    } else if (i > jacobGlobals.imageData.length) {
      window.location.hash = jacobGlobals.imageData.length;
    }

    // allow GA to track hash navigation for initial page
    _gaq.push([
      "_trackPageview",
      window.location.pathname + window.location.search + window.location.hash
    ]);
  }
}

function jumpToImage(index) {
  if (index >= 0 && index < jacobGlobals.imageData.length) {
    var data = jacobGlobals.imageData[index];

    var container = document.getElementById("Container");

    document.getElementById("TattooTitle").innerHTML = data.title;
    document.getElementById("TattooName").innerHTML = data.name;
    document.getElementById("TattooDescription").innerHTML = data.description;

    if (!data.img || data.img.height === 0) {
      data.img = new Image();
      data.img.addEventListener("load", function() {
        container.replaceChild(this, container.firstChild);
      });

      data.img.src = "./Images/" + data.srcLo;
      data.img.className = "tattooImage";

      // set loading paramaters
      container.replaceChild(jacobGlobals.loader, container.firstChild);
    } else {
      container.replaceChild(data.img, container.firstChild);
    }
  }
}

function initializeHashChange() {
  window.addEventListener("hashchange", function() {
    var content = document.getElementById("ShareContent");

    var index = parseInt(window.location.hash.substring(1));
    jumpToImage(index - 1);
    preloadImage(index);
    preloadImage(index - 2);

    // allow GA to track hash navigation
    _gaq.push([
      "_trackPageview",
      window.location.pathname + window.location.search + window.location.hash
    ]);
  });
}

function initializeAbout() {
  document.getElementById("About").addEventListener("click", function() {
    var content = document.getElementById("AboutContent");
    var span = document.getElementById("AboutSpan");

    if (content.className === "hidden") {
      content.className = "";
      span.className = "hidden";
      this.className = "expanded";
    } else {
      span.className = "";
      content.className = "hidden";
      this.className = "link";
    }
  });
}

function initializeArchive() {
  var list = document.getElementById("ArchiveList");
  var arr = jacobGlobals.imageData;

  // Using a fragment allows us to only make one DOM append.
  var fragment = document.createDocumentFragment();

  for (var i = arr.length - 1; i >= 0; i--) {
    var item = document.createElement("li");
    var anchor = document.createElement("a");

    anchor.href = "#" + (i + 1);
    anchor.innerHTML = arr[i].archiveTitle;

    item.appendChild(anchor);
    fragment.appendChild(item);
  }

  list.appendChild(fragment);

  document.getElementById("Archive").addEventListener("click", function() {
    var list = document.getElementById("ArchiveList");
    var span = document.getElementById("ArchiveSpan");

    if (list.className === "hidden") {
      list.className = "";
      span.className = "hidden";
    } else {
      span.className = "";
      list.className = "hidden";
    }
  });
}

function initializeLogo() {
  document.getElementById("Logo").addEventListener("click", function() {
    window.location.hash = jacobGlobals.imageData.length;
  });
}

function initializeShare() {
  document
    .getElementById("TwitterButton")
    .addEventListener("click", function() {
      window.open(
        "http://twitter.com/home/?status=" +
          encodeURIComponent(
            "That Tat - " +
              jacobGlobals.imageData[parseInt(location.hash.substring(1)) - 1]
                .archiveTitle
          ) +
          " " +
          window.location.href
      );
      _gaq.push([
        "_trackSocial",
        "Twitter",
        "Tweet",
        window.location.href,
        window.location.pathname + window.location.search + window.location.hash
      ]);
      return false;
    });

  document.getElementById("RedditButton").addEventListener("click", function() {
    window.open(
      "http://reddit.com/submit/?url=" +
        encodeURIComponent(window.location.href)
    );
    _gaq.push([
      "_trackSocial",
      "Reddit",
      "Submit",
      window.location.href,
      window.location.pathname + window.location.search + window.location.hash
    ]);
    return false;
  });

  document
    .getElementById("StumbleUponButton")
    .addEventListener("click", function() {
      window.open(
        "http://stumbleupon.com/submit/?url=" +
          encodeURIComponent(window.location.href)
      );
      _gaq.push([
        "_trackSocial",
        "StumbleUpon",
        "Submit",
        window.location.href,
        window.location.pathname + window.location.search + window.location.hash
      ]);
      return false;
    });

  document
    .getElementById("PinterestButton")
    .addEventListener("click", function() {
      window.open(
        "http://pinterest.com/pin/create/button/?url=" +
          encodeURIComponent(window.location.href) +
          "&media=" +
          encodeURIComponent(
            document.getElementById("Container").firstChild.src
          )
      );
      _gaq.push([
        "_trackSocial",
        "Pinterest",
        "Pin It",
        window.location.href,
        window.location.pathname + window.location.search + window.location.hash
      ]);
      return false;
    });

  document
    .getElementById("GooglePlusButton")
    .addEventListener("click", function() {
      window.open(
        "https://plusone.google.com/_/+1/confirm?hl=en&url=" +
          encodeURIComponent(window.location.href)
      );
      _gaq.push([
        "_trackSocial",
        "Google+",
        "+1",
        window.location.href,
        window.location.pathname + window.location.search + window.location.hash
      ]);
      return false;
    });

  document
    .getElementById("FacebookButton")
    .addEventListener("click", function() {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(window.location.href) +
          "&t=" +
          encodeURIComponent(
            "That Tat - " +
              jacobGlobals.imageData[parseInt(location.hash.substring(1)) - 1]
                .archiveTitle
          )
      );
      _gaq.push([
        "_trackSocial",
        "Facebook",
        "Share",
        window.location.href,
        window.location.pathname + window.location.search + window.location.hash
      ]);
      return false;
    });
}

function initializeMagnifier() {
  var magnifier = document.getElementById("Magnifier");

  var container = document.getElementById("Container");

  var mouseMove = function(e) {
    magnifier.style.top = -2 * e.offsetY;
    magnifier.style.left = -2 * e.offsetX;
  };

  container.addEventListener("mousemove", mouseMove(event));
}

function initializeLoader() {
  jacobGlobals.loader = document.getElementById("Loader");
}

function initializeAll() {
  initializeLoader();
  initializeHash();

  var index = parseInt(window.location.hash.substring(1)) - 1;

  jumpToImage(index);

  preloadImage(index + 1);
  preloadImage(index - 1);

  initializeButtons();
  initializeLogo();
  initializeShare();
  initializeAbout();
  initializeArchive();
  initializeHashChange();
  //initializeMagnifier();
}

// Begin running script as soon as it is safe to do so.
this.addEventListener("DOMContentLoaded", initializeAll);
