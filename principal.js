class Plant {
    constructor(x, y, type) {
        this.id = Date.now().toString();
        this.type = type;
        this.growth = 0;
        this.health = 100;
        this.needsWater = false;
        this.position = { x, y };
    }
}

class GardenSimulator {
    constructor() {
        this.plants = [];
        this.selectedTool = 'plant';
        this.weather = 'sunny';
        this.temperature = 25;
        this.moisture = 50;
        
        this.plantTypes = [
            { name: 'flower', emoji: '🌸', growthRate: 1.2 },
            { name: 'tree', emoji: '🌳', growthRate: 0.7 },
            { name: 'bush', emoji: '🌿', growthRate: 1 },
            { name: 'vegetable', emoji: '🥕', growthRate: 1.5 }
        ];

        this.init();
    }

    init() {
        // Initialize garden click handler
        const garden = document.getElementById('garden');
        garden.addEventListener('click', (e) => this.handleGardenClick(e));

        // Initialize tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTool = btn.dataset.tool;
            });
        });

        // Initialize weather controls
        document.querySelectorAll('.weather-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.weather-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.weather = btn.dataset.weather;
            });
        });

        // Initialize environment controls
        document.getElementById('temperature').addEventListener('input', (e) => {
            this.temperature = Number(e.target.value);
            document.getElementById('temp-value').textContent = this.temperature;
        });

        document.getElementById('moisture').addEventListener('input', (e) => {
            this.moisture = Number(e.target.value);
            document.getElementById('moisture-value').textContent = this.moisture;
        });

        // Start game loop
        setInterval(() => this.update(), 2000);
    }

    handleGardenClick(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        switch(this.selectedTool) {
            case 'plant':
                const randomType = this.plantTypes[Math.floor(Math.random() * this.plantTypes.length)];
                const newPlant = new Plant(x, y, randomType);
                this.plants.push(newPlant);
                this.renderPlant(newPlant);
                break;
            case 'remove':
                this.plants = this.plants.filter(plant => {
                    const distance = Math.hypot(plant.position.x - x, plant.position.y - y);
                    const shouldRemove = distance <= 30;
                    if (shouldRemove) {
                        document.getElementById(plant.id)?.remove();
                    }
                    return !shouldRemove;
                });
                break;
            case 'water':
                this.plants.forEach(plant => {
                    const distance = Math.hypot(plant.position.x - x, plant.position.y - y);
                    if (distance <= 50) {
                        plant.needsWater = false;
                        plant.health = Math.min(100, plant.health + 10);
                        this.updatePlantDisplay(plant);
                    }
                });
                break;
        }

        this.updateStats();
    }

    getGrowthRate(type, weather) {
        const baseRate = this.plantTypes.find(p => p.name === type.name)?.growthRate || 1;
        const weatherMultiplier = weather === 'sunny' ? 1.2 : 0.8;
        return baseRate * weatherMultiplier;
    }

    calculateHealth(plant) {
        let health = plant.health;
        
        if (plant.needsWater && this.moisture < 30) health -= 5;
        if (this.temperature > 35 || this.temperature < 5) health -= 3;
        if (this.moisture > 80) health -= 2;

        return Math.max(0, Math.min(100, health));
    }

    update() {
        this.plants.forEach(plant => {
            plant.growth = Math.min(100, plant.growth + this.getGrowthRate(plant.type, this.weather));
            plant.health = this.calculateHealth(plant);
            plant.needsWater = plant.needsWater || Math.random() < 0.1;
            this.updatePlantDisplay(plant);
        });

        this.updateStats();
    }

    renderPlant(plant) {
        const plantElement = document.createElement('div');
        plantElement.id = plant.id;
        plantElement.className = 'plant';
        plantElement.style.left = `${plant.position.x}px`;
        plantElement.style.top = `${plant.position.y}px`;

        plantElement.innerHTML = `
            <div class="plant-emoji" style="font-size: ${24 + (plant.growth * 0.24)}px">
                ${plant.type.emoji}
                ${plant.needsWater ? '<span class="water-indicator">💧</span>' : ''}
            </div>
            <div class="health-bar">
                <div class="health-bar-fill" style="width: ${plant.health}%; background-color: ${plant.health > 50 ? '#4CAF50' : '#f44336'}"></div>
            </div>
        `;

        document.getElementById('garden').appendChild(plantElement);
    }

    updatePlantDisplay(plant) {
        const plantElement = document.getElementById(plant.id);
        if (!plantElement) return;

        const emoji = plantElement.querySelector('.plant-emoji');
        emoji.style.fontSize = `${24 + (plant.growth * 0.24)}px`;
        
        const waterIndicator = plantElement.querySelector('.water-indicator');
        if (plant.needsWater && !waterIndicator) {
            emoji.innerHTML = `${plant.type.emoji}<span class="water-indicator">💧</span>`;
        } else if (!plant.needsWater && waterIndicator) {
            emoji.innerHTML = plant.type.emoji;
        }

        const healthBar = plantElement.querySelector('.health-bar-fill');
        healthBar.style.width = `${plant.health}%`;
        healthBar.style.backgroundColor = plant.health > 50 ? '#4CAF50' : '#f44336';
    }

    updateStats() {
        document.getElementById('total-plants').textContent = this.plants.length;
        document.getElementById('average-health').textContent = Math.round(
            this.plants.reduce((acc, plant) => acc + plant.health, 0) / (this.plants.length || 1)
        );
        document.getElementById('plants-needing-water').textContent = 
            this.plants.filter(p => p.needsWater).length;
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new GardenSimulator();
});