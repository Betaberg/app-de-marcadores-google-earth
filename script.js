// Dados dos marcadores com coordenadas e informações personalizadas
const markersData = [
    {
        id: 1,
        name: 'Base de Operações',
        description: 'Ponto central de coordenação',
        coordinates: {
            lat: -9.67297382,
            lng: -65.82065916,
            altitude: 180.41781499,
            distance: 103.26545301,
            heading: 34.99999988,
            tilt: 93.53296139
        }
    },
    {
        id: 2,
        name: 'Ponto de Observação Norte',
        description: 'Vista panorâmica da região norte',
        coordinates: {
            lat: -9.65000000,
            lng: -65.80000000,
            altitude: 200.00000000,
            distance: 150.00000000,
            heading: 45.00000000,
            tilt: 80.00000000
        }
    },
    {
        id: 3,
        name: 'Estação Meteorológica',
        description: 'Monitoramento climático da área',
        coordinates: {
            lat: -9.69000000,
            lng: -65.85000000,
            altitude: 160.00000000,
            distance: 120.00000000,
            heading: 15.00000000,
            tilt: 75.00000000
        }
    },
    {
        id: 4,
        name: 'Posto Avançado Sul',
        description: 'Monitoramento da região sul',
        coordinates: {
            lat: -9.70000000,
            lng: -65.81000000,
            altitude: 190.00000000,
            distance: 110.00000000,
            heading: 60.00000000,
            tilt: 85.00000000
        }
    },
    {
        id: 5,
        name: 'Centro de Comunicações',
        description: 'Hub de telecomunicações',
        coordinates: {
            lat: -9.66500000,
            lng: -65.83500000,
            altitude: 175.00000000,
            distance: 130.00000000,
            heading: 30.00000000,
            tilt: 90.00000000
        }
    }
];

// Variáveis globais
let selectedMarker = null;
let mapLoaded = false;

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderMarkerList();
    // Seleciona o primeiro marcador por padrão
    if (markersData.length > 0) {
        selectMarker(markersData[0]);
    }
}

// Renderiza a lista de marcadores
function renderMarkerList() {
    const markerList = document.getElementById('markerList');
    markerList.innerHTML = '';

    markersData.forEach(marker => {
        const listItem = document.createElement('li');
        listItem.className = 'marker-item';
        listItem.setAttribute('data-marker-id', marker.id);
        listItem.setAttribute('role', 'button');
        listItem.setAttribute('tabindex', '0');
        
        listItem.innerHTML = `
            <div class="marker-name">${marker.name}</div>
            <div class="marker-coords">
                ${marker.coordinates.lat.toFixed(6)}, ${marker.coordinates.lng.toFixed(6)}
            </div>
        `;

        // Event listeners para clique e teclado
        listItem.addEventListener('click', () => selectMarker(marker));
        listItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectMarker(marker);
            }
        });

        markerList.appendChild(listItem);
    });
}

// Seleciona um marcador e atualiza o mapa
function selectMarker(marker) {
    selectedMarker = marker;
    
    // Atualiza a interface
    updateActiveMarker(marker.id);
    updateMapHeader(marker);
    loadMap(marker);
}

// Atualiza o marcador ativo na lista
function updateActiveMarker(markerId) {
    // Remove classe active de todos os itens
    document.querySelectorAll('.marker-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adiciona classe active ao item selecionado
    const activeItem = document.querySelector(`[data-marker-id="${markerId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Atualiza o cabeçalho do mapa
function updateMapHeader(marker) {
    const markerNameElement = document.getElementById('currentMarkerName');
    markerNameElement.textContent = marker.name;
}

// Constrói a URL do Google Earth com base nas coordenadas do marcador
function buildEarthURL(marker) {
    const { lat, lng, altitude, distance, heading, tilt } = marker.coordinates;
    
    // URL base do Google Earth Web
    const baseURL = 'https://earth.google.com/web/@';
    
    // Constrói os parâmetros da URL
    const params = `${lat},${lng},${altitude}a,${distance}d,${heading}y,${tilt}h,0t,0r`;
    
    // Adiciona parâmetros adicionais se necessário
    const additionalParams = '/data=CgRCAggBMikKJwolCiExc1hhTXdRUTVUNUdtTlNjV1ktbndPclVVUloxQ01BT2MgAToDCgEwQgIIAEoHCJ6rxRAQAQ';
    
    return baseURL + params + additionalParams;
}

// Carrega o mapa no iframe
function loadMap(marker) {
    const iframe = document.getElementById('earthMap');
    const loadingElement = document.getElementById('mapLoading');
    const errorElement = document.getElementById('mapError');
    
    // Mostra o loading
    showLoading();
    
    // Constrói a URL do mapa
    const mapURL = buildEarthURL(marker);
    
    // Configura o iframe
    iframe.src = mapURL;
    
    // Event listeners para o iframe
    iframe.onload = function() {
        hideLoading();
        mapLoaded = true;
        console.log(`Mapa carregado para: ${marker.name}`);
    };
    
    iframe.onerror = function() {
        showError();
        console.error(`Erro ao carregar mapa para: ${marker.name}`);
    };
    
    // Timeout para detectar falhas de carregamento
    setTimeout(() => {
        if (!mapLoaded) {
            showError();
        }
    }, 10000); // 10 segundos timeout
}

// Mostra o indicador de carregamento
function showLoading() {
    const loadingElement = document.getElementById('mapLoading');
    const errorElement = document.getElementById('mapError');
    
    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';
    mapLoaded = false;
}

// Esconde o indicador de carregamento
function hideLoading() {
    const loadingElement = document.getElementById('mapLoading');
    loadingElement.style.display = 'none';
}

// Mostra a mensagem de erro
function showError() {
    const loadingElement = document.getElementById('mapLoading');
    const errorElement = document.getElementById('mapError');
    
    loadingElement.style.display = 'none';
    errorElement.style.display = 'flex';
    mapLoaded = false;
}

// Função para recarregar o mapa
function reloadMap() {
    if (selectedMarker) {
        loadMap(selectedMarker);
    }
}

// Função para adicionar novos marcadores (para futuras expansões)
function addMarker(markerData) {
    markersData.push(markerData);
    renderMarkerList();
}

// Função para remover marcadores (para futuras expansões)
function removeMarker(markerId) {
    const index = markersData.findIndex(marker => marker.id === markerId);
    if (index > -1) {
        markersData.splice(index, 1);
        renderMarkerList();
        
        // Se o marcador removido estava selecionado, seleciona o primeiro disponível
        if (selectedMarker && selectedMarker.id === markerId) {
            if (markersData.length > 0) {
                selectMarker(markersData[0]);
            }
        }
    }
}

// Função para buscar marcadores (para futuras expansões)
function searchMarkers(query) {
    const filteredMarkers = markersData.filter(marker => 
        marker.name.toLowerCase().includes(query.toLowerCase()) ||
        marker.description.toLowerCase().includes(query.toLowerCase())
    );
    return filteredMarkers;
}

// Event listeners para navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateMarkers(e.key === 'ArrowUp' ? -1 : 1);
    }
});

// Navegação por teclado entre marcadores
function navigateMarkers(direction) {
    if (!selectedMarker) return;
    
    const currentIndex = markersData.findIndex(marker => marker.id === selectedMarker.id);
    let newIndex = currentIndex + direction;
    
    // Wrap around
    if (newIndex < 0) {
        newIndex = markersData.length - 1;
    } else if (newIndex >= markersData.length) {
        newIndex = 0;
    }
    
    selectMarker(markersData[newIndex]);
}

// Função utilitária para formatar coordenadas
function formatCoordinates(lat, lng) {
    return `${lat.toFixed(6)}°, ${lng.toFixed(6)}°`;
}

// Função para exportar dados dos marcadores (para futuras expansões)
function exportMarkers() {
    const dataStr = JSON.stringify(markersData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'marcadores.json';
    link.click();
}

// Log de inicialização
console.log('App de Marcadores Google Earth inicializado');
console.log(`${markersData.length} marcadores carregados`);
