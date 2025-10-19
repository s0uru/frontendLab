const fs = require('fs');

// Check if module-data.js already exists in src directory
if (fs.existsSync('./src/module-data.js')) {
    console.log('src/module-data.js already exists. Remove it first if you want to regenerate.');
    process.exit(0);
}

const count = Number(process.argv[2]); // read number of objects

if (!count || count <= 0) {
    console.error('Please provide a valid number of objects to generate.');
    console.log('Usage: node src/data/module-data-generator.cjs <number>');
    process.exit(1);
}

let names = []; // array with names

fs.readFile('./src/data/names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    // Split string with names into lines
    names = data.split("\n").map(s => s.trim()).filter(n => n.length != 0);
    console.log(`Loaded ${names.length} names from names.txt`);
    
    // Generate random data
    const people = [];
    const usedNames = {}; // Track name usage for email generation
    
    for (let i = 0; i < count; i++) {
        // Random name selection
        const name = names[Math.floor(Math.random() * names.length)];
        
        // Track name usage for unique emails
        usedNames[name] = (usedNames[name] || 0) + 1;
        
        // Generate random birth date (between 1980 and 2005)
        const year = 1980 + Math.floor(Math.random() * 26);
        const month = 1 + Math.floor(Math.random() * 12);
        const day = 1 + Math.floor(Math.random() * 28); // Simplified to avoid month-specific day issues
        const birthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Generate email based on name and counter
        const emailName = name.toLowerCase();
        const emailSuffix = usedNames[name] > 1 ? usedNames[name] : '';
        const email = `${emailName}${emailSuffix}@wsei.edu.pl`;
        
        // Generate random phone number (format: XXX-XXX-XXX)
        const phone1 = (100 + Math.floor(Math.random() * 900)).toString();
        const phone2 = (100 + Math.floor(Math.random() * 900)).toString();
        const phone3 = (100 + Math.floor(Math.random() * 900)).toString();
        const phone = `${phone1}-${phone2}-${phone3}`;
        
        people.push({
            id: i + 1,
            name: name,
            birthDate: birthDate,
            email: email,
            phone: phone
        });
    }
    
    // Generate the module content
    let content = "export const people = [\n";
    
    people.forEach((person, index) => {
        content += `{\n`;
        content += `    id: ${person.id},\n`;
        content += `    name: "${person.name}",\n`;
        content += `    birthDate: "${person.birthDate}",\n`;
        content += `    email: "${person.email}",\n`;
        content += `    phone: "${person.phone}"\n`;
        content += `}`;
        
        if (index < people.length - 1) {
            content += ",";
        }
        content += "\n";
    });
    
    content += "];";
    
    // Write the string to file in src directory
    fs.writeFile('./src/module-data.js', content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`src/module-data.js generated with ${count} people`);
    });
});