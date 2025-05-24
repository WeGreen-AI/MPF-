// 基金比較功能
// 這個文件將實現基金比較和圖表顯示功能

// 使用Chart.js建立基金比較圖表
function createComparisonChart(funds) {
    const ctx = document.getElementById('comparison-chart').getContext('2d');
    
    // 準備資料
    const labels = funds.map(fund => fund.name);
    const oneYearData = funds.map(fund => parseFloat(fund.return1Y));
    const fiveYearData = funds.map(fund => parseFloat(fund.return5Y));
    const riskData = funds.map(fund => fund.risk);
    
    // 建立圖表
    const comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '一年回報率',
                    data: oneYearData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: '五年回報率',
                    data: fiveYearData,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '回報率 (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '基金表現比較'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y || 0;
                            return `${label}: ${value.toFixed(2)}%`;
                        }
                    }
                }
            }
        }
    });
    
    return comparisonChart;
}

// 建立風險調整回報圖表
function createRiskAdjustedChart(funds) {
    const container = document.getElementById('risk-adjusted-chart');
    
    // 呈現風險調整後回報
    let html = '<div class="chart-title">風險調整後回報比較</div>';
    html += '<table class="risk-adjusted-table">';
    html += '<thead><tr><th>基金名稱</th><th>風險級別</th><th>一年回報</th><th>風險調整後回報*</th></tr></thead>';
    html += '<tbody>';
    
    funds.forEach(fund => {
        const riskAdjusted = parseFloat(fund.return1Y) / fund.risk;
        html += `<tr>
            <td>${fund.name}</td>
            <td>${fund.risk}</td>
            <td>${fund.return1Y}</td>
            <td>${riskAdjusted.toFixed(2)}%</td>
        </tr>`;
    });
    
    html += '</tbody>';
    html += '</table>';
    html += '<div class="chart-note">* 風險調整後回報 = 回報率 / 風險級別</div>';
    
    container.innerHTML = html;
}

// 建立基金比較表格
function createComparisonTable(funds) {
    const container = document.getElementById('comparison-table-container');
    
    // 建立基金詳細比較表格
    let html = '<div class="chart-title">基金詳細比較</div>';
    html += '<table class="comparison-table">';
    html += `<thead>
        <tr>
            <th>基金名稱</th>
            <th>風險級別</th>
            <th>一年回報</th>
            <th>五年回報</th>
            <th>管理費率</th>
            <th>基金規模 (百萬)</th>
        </tr>
    </thead>`;
    html += '<tbody>';
    
    funds.forEach(fund => {
        html += `<tr>
            <td>${fund.name}</td>
            <td>${fund.risk}</td>
            <td>${fund.return1Y}</td>
            <td>${fund.return5Y}</td>
            <td>${fund.fer}</td>
            <td>${fund.size}</td>
        </tr>`;
    });
    
    html += '</tbody>';
    html += '</table>';
    
    container.innerHTML = html;
}

// 執行所有比較分析
function compareSelectedFunds(funds) {
    // 顯示比較部分
    document.getElementById('comparison-section').classList.remove('hidden');
    
    // 建立各種圖表
    createComparisonChart(funds);
    createRiskAdjustedChart(funds);
    createComparisonTable(funds);
    
    // 建立基金卡片
    const fundCardsContainer = document.getElementById('fund-cards');
    fundCardsContainer.innerHTML = '';
    
    funds.forEach(fund => {
        const card = document.createElement('div');
        card.className = 'fund-card';
        card.innerHTML = `
            <h3>${fund.name}</h3>
            <div>風險級別: <span class="current-risk">${fund.risk}</span></div>
            <div>一年回報: ${fund.return1Y}</div>
            <div>五年回報: ${fund.return5Y}</div>
            <div>管理費率: ${fund.fer}</div>
        `;
        fundCardsContainer.appendChild(card);
    });
}
