// 示例對話流程
const chatFlow = {
    welcome: {
        message: "您好！我是您的強積金（MPF）投資助理。我會協助您找到最適合的強積金投資組合。\n\n首先，請問您的年齡是？（18-64歲）",
        validation: (input) => {
            const age = parseInt(input);
            if (isNaN(age) || age < 18 || age > 64) {
                return "請輸入有效年齡（18-64歲）";
            }
            return null;
        }
    },
    retirement: {
        message: "請問您預計的退休年齡是？（必須大於目前年齡，最多64歲）",
        validation: (input) => {
            const retirementAge = parseInt(input);
            const currentAge = parseInt(currentState.answers.age);
            if (isNaN(retirementAge) || retirementAge <= currentAge || retirementAge > 64) {
                return `請輸入有效的退休年齡（需大於目前年齡 ${currentAge}，最多64歲）`;
            }
            return null;
        }
    },
    provider: {
        message: "請選擇您的強積金受託人：",
        options: ["友邦信託", "HSBC", "中國人壽", "中銀保誠", "交通", "信安（亞洲）", "宏利", "東亞", "永明", "渣打信托", "萬通", "銀聯信託"]
    },
    riskAssessment: {
        questions: [
            {
                id: "retirement_lifestyle",
                message: "您希望在退休後的生活水平是？",
                options: [
                    "舒適，不必擔心開支",
                    "基本生活需求即可",
                    "只要能夠支付必要開支即可"
                ],
                scores: {
                    "舒適，不必擔心開支": 3,
                    "基本生活需求即可": 2,
                    "只要能夠支付必要開支即可": 1
                }
            },
            {
                id: "financial_burden",
                message: "您的家庭財務負擔情況是？",
                options: [
                    "幾乎沒有財務負擔",
                    "有適度的負擔但可控制",
                    "負擔較重"
                ],
                scores: {
                    "幾乎沒有財務負擔": 3,
                    "有適度的負擔但可控制": 2,
                    "負擔較重": 1
                }
            },
            {
                id: "current_investment",
                message: "您目前的投資組合中，有多少比例是高風險資產（如股票和加密貨幣）？",
                options: [
                    "超過70%",
                    "30%-70%",
                    "少於30%"
                ],
                scores: {
                    "超過70%": 3,
                    "30%-70%": 2,
                    "少於30%": 1
                }
            },
            {
                id: "financial_advice",
                message: "您對專業財務建議的依賴程度是？",
                options: [
                    "非常依賴，幾乎所有決策都會諮詢專家",
                    "偶爾諮詢，但大部分時間自己決定",
                    "完全依賴自己，從不諮詢專家"
                ],
                scores: {
                    "非常依賴，幾乎所有決策都會諮詢專家": 3,
                    "偶爾諮詢，但大部分時間自己決定": 2,
                    "完全依賴自己，從不諮詢專家": 1
                }
            },
            {
                id: "emergency_fund",
                message: "您目前的緊急儲備金（流動現金）相當於幾個月的開支？",
                options: [
                    "12個月以上",
                    "6-12個月",
                    "少於6個月"
                ],
                scores: {
                    "12個月以上": 3,
                    "6-12個月": 2,
                    "少於6個月": 1
                }
            }
        ]
    }
};

// 使用實際的基金數據，從Excel資料表更新
const mpfFunds = {
    "友邦信託": {
        "股票基金": [
            {
                name: "美洲基金",
                risk: 6,
                return2024: "22.30%",
                return2023: "24.29%",
                return2022: "-19.30%",
                return2021: "26.50%",
                return2020: "10.53%",
                avgReturn: "12.86%",
                fer: "0.82%",
                size: "5,269.42"
            },
            {
                name: "亞洲股票基金",
                risk: 6,
                return2024: "7.24%",
                return2023: "13.62%",
                return2022: "-18.15%",
                return2021: "6.26%",
                return2020: "28.10%",
                avgReturn: "7.41%",
                fer: "1.69%",
                size: "7,406.85"
            },
            {
                name: "歐洲股票基金",
                risk: 6,
                return2024: "1.22%",
                return2023: "19.12%",
                return2022: "-14.27%",
                return2021: "20.05%",
                return2020: "3.06%",
                avgReturn: "5.84%",
                fer: "1.67%",
                size: "2,813.78"
            },
            {
                name: "大中華股票基金",
                risk: 6,
                return2024: "15.61%",
                return2023: "-5.76%",
                return2022: "-22.98%",
                return2021: "-7.15%",
                return2020: "40.24%",
                avgReturn: "3.99%",
                fer: "1.67%",
                size: "14,413.49"
            }
        ],
        "混合資產基金": [
            {
                name: "均衡組合",
                risk: 5,
                return2024: "4.72%",
                return2023: "4.69%",
                return2022: "-16.22%",
                return2021: "0.19%",
                return2020: "11.46%",
                avgReturn: "0.97%",
                fer: "1.67%",
                size: "7,712.40"
            },
            {
                name: "穩定資本組合",
                risk: 4,
                return2024: "2.30%",
                return2023: "4.72%",
                return2022: "-15.00%",
                return2021: "-1.17%",
                return2020: "9.58%",
                avgReturn: "0.09%",
                fer: "1.67%",
                size: "4,287.79"
            },
            {
                name: "中港動態資產配置基金",
                risk: 6,
                return2024: "11.49%",
                return2023: "-9.08%",
                return2022: "-13.15%",
                return2021: "-8.03%",
                return2020: "8.72%",
                avgReturn: "-2.01%",
                fer: "1.28%",
                size: "1,040.58"
            },
            {
                name: "增長組合",
                risk: 5,
                return2024: "10.20%",
                return2023: "6.98%",
                return2022: "-16.80%",
                return2021: "3.71%",
                return2020: "15.76%",
                avgReturn: "3.97%",
                fer: "1.67%",
                size: "14,687.35"
            }
        ],
        "債券基金": [
            {
                name: "亞洲債券基金",
                risk: 4,
                return2024: "1.91%",
                return2023: "3.96%",
                return2022: "-8.62%",
                return2021: "-5.72%",
                return2020: "8.06%",
                avgReturn: "-0.08%",
                fer: "0.78%",
                size: "1,625.18"
            },
            {
                name: "環球債券基金",
                risk: 4,
                return2024: "-1.64%",
                return2023: "5.09%",
                return2022: "-19.55%",
                return2021: "-5.61%",
                return2020: "11.61%",
                avgReturn: "-2.02%",
                fer: "0.98%",
                size: "3,301.55"
            }
        ],
        "保證基金": [
            {
                name: "保證組合",
                risk: 1,
                return2024: "1.13%",
                return2023: "0.23%",
                return2022: "0.15%",
                return2021: "0.15%",
                return2020: "0.15%",
                avgReturn: "0.36%",
                fer: "1.56%",
                size: "10,226.22"
            }
        ]
    },
    "HSBC": {
        "股票基金": [
            {
                name: "亞太股票基金",
                risk: 6,
                return2024: "8.25%",
                return2023: "10.27%",
                return2022: "-17.53%",
                return2021: "7.23%",
                return2020: "20.55%",
                avgReturn: "5.75%",
                fer: "1.53%",
                size: "8,660.64"
            },
            {
                name: "中國股票基金",
                risk: 7,
                return2024: "19.88%",
                return2023: "-10.22%",
                return2022: "-22.62%",
                return2021: "-18.07%",
                return2020: "37.78%",
                avgReturn: "1.35%",
                fer: "1.53%",
                size: "7,190.17"
            }
        ],
        "混合資產基金": [
            {
                name: "均衡基金",
                risk: 5,
                return2024: "6.35%",
                return2023: "5.62%",
                return2022: "-14.25%",
                return2021: "3.71%",
                return2020: "14.22%",
                avgReturn: "3.13%",
                fer: "1.42%",
                size: "18,116.02"
            }
        ],
        "債券基金": [
            {
                name: "環球債券基金",
                risk: 4,
                return2024: "-0.67%",
                return2023: "6.12%",
                return2022: "-17.42%",
                return2021: "-3.87%",
                return2020: "10.86%",
                avgReturn: "-1.00%",
                fer: "1.36%",
                size: "2,531.98"
            }
        ]
    },
    "宏利": {
        "股票基金": [
            {
                name: "宏利MPF恒指ESG基金",
                risk: 6,
                return2024: "16.42%",
                return2023: "-12.27%",
                return2022: "-15.42%",
                return2021: "-11.53%",
                return2020: "0.52%",
                avgReturn: "-4.46%",
                fer: "0.99%",
                size: "7,110.89"
            },
            {
                name: "宏利MPF康健護理基金",
                risk: 5,
                return2024: "5.29%",
                return2023: "8.53%",
                return2022: "-3.71%",
                return2021: "16.04%",
                return2020: "14.76%",
                avgReturn: "8.18%",
                fer: "1.91%",
                size: "51,163.22"
            }
        ],
        "混合資產基金": [
            {
                name: "宏利MPF增長基金",
                risk: 5,
                return2024: "7.18%",
                return2023: "9.87%",
                return2022: "-14.61%",
                return2021: "6.37%",
                return2020: "15.64%",
                avgReturn: "4.89%",
                fer: "1.79%",
                size: "18,719.14"
            }
        ]
    },
    "永明": {
        "股票基金": [
            {
                name: "永明強積金大中華股票基金",
                risk: 6,
                return2024: "12.53%",
                return2023: "-7.18%",
                return2022: "-19.87%",
                return2021: "-5.62%",
                return2020: "35.28%",
                avgReturn: "3.03%",
                fer: "1.90%",
                size: "5,606.58"
            }
        ],
        "混合資產基金": [
            {
                name: "永明強積金平穩基金",
                risk: 4,
                return2024: "3.15%",
                return2023: "5.27%",
                return2022: "-13.28%",
                return2021: "0.76%",
                return2020: "8.35%",
                avgReturn: "0.85%",
                fer: "1.82%",
                size: "367.80"
            }
        ],
        "債券基金": [
            {
                name: "永明強積金環球債券基金",
                risk: 4,
                return2024: "-0.85%",
                return2023: "5.72%",
                return2022: "-16.83%",
                return2021: "-4.21%",
                return2020: "10.36%",
                avgReturn: "-1.16%",
                fer: "1.62%",
                size: "2,531.98"
            }
        ]
    },
    "中銀保誠": {
        "股票基金": [
            {
                name: "中國股票基金",
                risk: 7,
                return2024: "18.64%",
                return2023: "-8.95%",
                return2022: "-21.36%",
                return2021: "-15.82%",
                return2020: "35.47%",
                avgReturn: "1.60%",
                fer: "1.68%",
                size: "7,850.32"
            }
        ],
        "混合資產基金": [
            {
                name: "平穩增長基金",
                risk: 4,
                return2024: "3.56%",
                return2023: "4.92%",
                return2022: "-12.67%",
                return2021: "1.28%",
                return2020: "9.14%",
                avgReturn: "1.25%",
                fer: "1.63%",
                size: "5,325.18"
            }
        ]
    },
    "銀聯信託": {
        "股票基金": [
            {
                name: "BCT環球股票基金",
                risk: 6,
                return2024: "11.35%",
                return2023: "16.58%",
                return2022: "-15.92%",
                return2021: "14.72%",
                return2020: "12.83%",
                avgReturn: "7.91%",
                fer: "1.56%",
                size: "4,827.36"
            }
        ],
        "混合資產基金": [
            {
                name: "BCT均衡基金",
                risk: 5,
                return2024: "5.86%",
                return2023: "6.21%",
                return2022: "-13.75%",
                return2021: "4.53%",
                return2020: "12.57%",
                avgReturn: "3.08%",
                fer: "1.51%",
                size: "6,784.92"
            }
        ]
    }
};

// 當前對話狀態
let currentState = {
    step: 'welcome',
    answers: {},
    currentQuestion: 0,
    riskProfile: null,
    selectedCompany: null
};

// DOM 元素
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 添加機器人訊息
function addBotMessage(message, options = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png" class="message-avatar">
        <div class="message-content">
            <div class="message-text">${message}</div>
            ${options.length > 0 ? createOptionsButtons(options) : ''}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加用戶訊息
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 創建選項按鈕
function createOptionsButtons(options) {
    return `
        <div class="options-container">
            ${options.map(option => `
                <button class="option-button" onclick="handleOptionClick('${option}')">${option}</button>
            `).join('')}
        </div>
    `;
}

// 處理選項點擊
function handleOptionClick(option) {
    addUserMessage(option);
    processUserInput(option);
}

// 處理用戶輸入
function processUserInput(input) {
    if (currentState.step === 'welcome') {
        const error = chatFlow.welcome.validation(input);
        if (error) {
            addBotMessage(error);
            return;
        }
        currentState.answers.age = input;
        currentState.step = 'retirement';
        addBotMessage(chatFlow.retirement.message);
    } else if (currentState.step === 'retirement') {
        const error = chatFlow.retirement.validation(input);
        if (error) {
            addBotMessage(error);
            return;
        }
        currentState.answers.retirementAge = input;
        currentState.step = 'provider';
        addBotMessage(chatFlow.provider.message, chatFlow.provider.options);
    } else if (currentState.step === 'provider') {
        currentState.selectedCompany = input;
        currentState.step = 'riskAssessment';
        currentState.currentQuestion = 0;
        askNextQuestion();
    } else if (currentState.step === 'riskAssessment') {
        currentState.answers[chatFlow.riskAssessment.questions[currentState.currentQuestion].id] = input;
        currentState.currentQuestion++;
        askNextQuestion();
    } else if (currentState.step === 'showRecommendation') {
        switch (input) {
            case '查看建議基金':
                showRecommendedFunds(currentState.riskProfile, currentState.selectedCompany);
                break;
            case '重新評估':
                currentState.step = 'welcome';
                currentState.currentQuestion = 0;
                currentState.answers = {};
                addBotMessage(chatFlow.welcome.message);
                break;
            case '返回主選單':
                currentState.step = 'welcome';
                addBotMessage(chatFlow.welcome.message);
                break;
        }
    }
}

// 詢問下一個問題
function askNextQuestion() {
    if (currentState.currentQuestion < chatFlow.riskAssessment.questions.length) {
        const question = chatFlow.riskAssessment.questions[currentState.currentQuestion];
        addBotMessage(question.message, question.options);
    } else {
        // 完成風險評估
        const result = calculateRiskProfile(currentState.answers);
        showRiskResult(result);
    }
}

// 計算風險評估結果
function calculateRiskProfile(answers) {
    let score = 0;
    for (const question in answers) {
        const answer = answers[question];
        const questionData = chatFlow.riskAssessment.questions.find(q => q.id === question);
        if (questionData && questionData.scores) {
            score += questionData.scores[answer];
        }
    }
    const maxScore = chatFlow.riskAssessment.questions.reduce((acc, q) => acc + Math.max(...Object.values(q.scores)), 0);
    const scorePercentage = (score / maxScore) * 100;

    let profile, explanation, allocation;
    if (scorePercentage <= 30) {
        profile = '保守型';
        explanation = '您適合採取保守的投資策略，主要投資於風險級別較低（1-3級）的基金。建議以保本為主，適合投資較低風險的基金。';
        allocation = {
            equity: 10, // 股票
            mixed: 20, // 混合資產
            bonds: 40, // 債券
            guaranteed: 20, // 保證基金
            money: 10 // 貨幣市場基金
        };
    } else if (scorePercentage <= 60) {
        profile = '平衡型';
        explanation = '您適合採取均衡的投資策略，主要投資於中等風險（4-5級）的基金。建議在風險和回報之間取得平衡。';
        allocation = {
            equity: 40,
            mixed: 40,
            bonds: 15,
            guaranteed: 5,
            money: 0
        };
    } else {
        profile = '進取型';
        explanation = '您適合採取進取的投資策略，可以考慮投資於較高風險（6-7級）的基金。可承受較高風險以追求更高回報。';
        allocation = {
            equity: 70,
            mixed: 25,
            bonds: 5,
            guaranteed: 0,
            money: 0
        };
    }
    
    // 根據距離退休年齡的距離進行調整
    const currentAge = parseInt(currentState.answers.age);
    const retirementAge = parseInt(currentState.answers.retirementAge);
    const yearsToRetirement = retirementAge - currentAge;
    
    // 當退休距離很近時，增加保守性
    if (yearsToRetirement <= 5) {
        // 調整為更保守的配置
        if (profile === '進取型') {
            allocation.equity = Math.max(allocation.equity - 20, 30);
            allocation.bonds = Math.min(allocation.bonds + 10, 30);
            allocation.guaranteed = Math.min(allocation.guaranteed + 10, 20);
            allocation.mixed = 100 - allocation.equity - allocation.bonds - allocation.guaranteed - allocation.money;
        } else if (profile === '平衡型') {
            allocation.equity = Math.max(allocation.equity - 10, 20);
            allocation.bonds = Math.min(allocation.bonds + 5, 25);
            allocation.guaranteed = Math.min(allocation.guaranteed + 5, 15);
            allocation.mixed = 100 - allocation.equity - allocation.bonds - allocation.guaranteed - allocation.money;
        }
    }
    
    // 當退休距離很遠時，可以更進取
    if (yearsToRetirement >= 20 && profile !== '保守型') {
        // 調整為更進取的配置
        allocation.equity = Math.min(allocation.equity + 10, 80);
        allocation.guaranteed = Math.max(allocation.guaranteed - 5, 0);
        allocation.bonds = Math.max(allocation.bonds - 5, 0);
        allocation.mixed = 100 - allocation.equity - allocation.bonds - allocation.guaranteed - allocation.money;
    }

    return {
        profile,
        explanation,
        score,
        allocation
    };
}

// 顯示風險評估結果
function showRiskResult(result) {
    currentState.step = 'showRecommendation';
    currentState.riskProfile = result;

    // 基本風險評估結果
    let message = `根據您的回答，您的風險承受程度為：${result.profile}\n\n`;
    message += `${result.explanation}\n\n`;
    
    // 資產分配建議
    message += "建議資產分配：\n";
    message += `• 股票基金：${result.allocation.equity}%\n`;
    message += `• 混合資產基金：${result.allocation.mixed}%\n`;
    message += `• 債券基金：${result.allocation.bonds}%\n`;
    if (result.allocation.guaranteed) {
        message += `• 保證基金：${result.allocation.guaranteed}%\n`;
    }
    if (result.allocation.money) {
        message += `• 貨幣市場基金：${result.allocation.money}%\n`;
    }
    message += "\n";
    
    // 根據風險模型提供具體建議
    message += "根據您的風險承受能力，提供以下建議：\n";
    
    if (result.profile === '進取型') {
        message += "• 您適合在股票基金上配置較高比例，以最大化長期回報\n";
        message += "• 建議選擇風險級別為5-7的股票基金，適當配置亞洲及環球市場\n";
        message += "• 可以考慮特定行業或主題基金，增加投資多樣化\n";
        message += "• 注意定期將資產組合再平衡，以避免单一市場所帶來的風險\n";
    } else if (result.profile === '平衡型') {
        message += "• 您的資產分配應在股票、混合資產及債券基金之間取得較平衡配置\n";
        message += "• 建議選擇風險級別為4-5的混合資產基金作為核心\n";
        message += "• 可選擇核心累積基金，其風險回報特性符合您的需求\n";
        message += "• 獨特的經濟周期時，可適當調整股票及債券基金的比例\n";
    } else {
        message += "• 您應該使用保守的投資策略，重點配置債券基金\n";
        message += "• 建議選擇風險級別為1-3的基金，例如保證基金及貨幣市場基金\n";
        message += "• 可考慮將部分資金配置在低風險的債券基金中，以獲取穩定收益\n";
        message += "• 避免高風險的專門性股票基金或工具\n";
    }
    
    message += "\n";
    
    // 添加詳細的風險提示
    message += "基金風險等級說明：\n";
    message += "• 1級: 非常低風險，適合保守型投資者\n";
    message += "• 2-3級: 低風險，適合短期到中期投資\n";
    message += "• 4-5級: 中等風險，適合平衡型投資者\n";
    message += "• 6-7級: 高風險，適合長期投資者及進取型投資者\n\n";
    
    // 資產類別說明
    message += "資產類別說明：\n";
    message += "• 股票基金：潛在回報較高，但波動很大\n";
    message += "• 混合資產基金：平衡風險與回報，投資於多種資產類型\n";
    message += "• 債券基金：相對穩定的收益，但受利率變動影響\n";
    message += "• 保證基金：提供本金保證，適合保守型投資者\n";
    message += "• 貨幣市場基金：適合短期存放，流動性高\n\n";

    // 添加退休規劃提示
    message += "對於您的退休規劃：\n";
    const currentAge = parseInt(currentState.answers.age);
    const retirementAge = parseInt(currentState.answers.retirementAge);
    const yearsToRetirement = retirementAge - currentAge;
    
    if (yearsToRetirement > 20) {
        message += "• 您距離退休還有較長時間，可接受較高風險以追求長期增長\n";
        message += "• 建議定期檢討組合，隨著年齡增長適當降低風險\n";
    } else if (yearsToRetirement > 10) {
        message += "• 您距離退休還有10-20年，應保持平衡的資產配置\n";
        message += "• 建議每3-5年檢討一次組合，進行風險調整\n";
    } else if (yearsToRetirement > 5) {
        message += "• 您距離退休不邊遠，應開始將資產配置調整為較保守型\n";
        message += "• 建議每1-2年檢討一次組合，進行風險降低\n";
    } else {
        message += "• 您距離退休很近，應優先考慮資本保障和收益穩定性\n";
        message += "• 建議將大部分資產配置在保證基金及低風險債券基金\n";
    }

    message += "\n您想：";
    addBotMessage(message, ['查看建議基金', '重新評估', '返回主選單']);
}

// 顯示建議基金
function showRecommendedFunds(riskProfile, trustee) {
    const companyFunds = mpfFunds[trustee];
    if (!companyFunds) {
        addBotMessage(`抱歉，目前未能提供 ${trustee} 的基金資料。要重新選擇受託人嗎？`, ["重新評估", "返回主選單"]);
        return;
    }

    let message = `根據您的風險承受程度（${riskProfile.profile}）和資產分配建議，以下是為您挑選的${trustee}基金組合：\n\n`;

    // 根據風險級別篩選合適的基金
    let recommendedFunds = {
        equity: [],
        mixed: [],
        bonds: []
    };

    // 根據風險程度篩選基金
    if (riskProfile.profile === '保守型') {
        recommendedFunds.bonds = companyFunds["債券基金"]?.filter(f => f.risk <= 3) || [];
        recommendedFunds.mixed = companyFunds["混合資產基金"]?.filter(f => f.risk <= 4) || [];
        recommendedFunds.equity = companyFunds["股票基金"]?.filter(f => f.risk <= 4) || [];
    } else if (riskProfile.profile === '平衡型') {
        recommendedFunds.bonds = companyFunds["債券基金"]?.filter(f => f.risk >= 3 && f.risk <= 5) || [];
        recommendedFunds.mixed = companyFunds["混合資產基金"]?.filter(f => f.risk >= 4 && f.risk <= 5) || [];
        recommendedFunds.equity = companyFunds["股票基金"]?.filter(f => f.risk >= 4 && f.risk <= 5) || [];
    } else {
        recommendedFunds.bonds = companyFunds["債券基金"]?.filter(f => f.risk >= 4) || [];
        recommendedFunds.mixed = companyFunds["混合資產基金"]?.filter(f => f.risk >= 5) || [];
        recommendedFunds.equity = companyFunds["股票基金"]?.filter(f => f.risk >= 6) || [];
    }

    // 顯示股票基金建議
    message += `📈 股票基金 (建議配置${riskProfile.allocation.equity}%)\n`;
    if (recommendedFunds.equity.length > 0) {
        recommendedFunds.equity.forEach(fund => {
            message += ` • ${fund.name}\n`;
            message += ` 風險級別：${fund.risk}\n`;
            
            // 根據新的數據結構顯示回報率
            if (fund.return2024) {
                message += ` 2024年回報：${fund.return2024}\n`;
            } else if (fund.return1Y) { // 兼容舊版本
                message += ` 近一年回報：${fund.return1Y}\n`;
            }
            
            if (fund.return2023) {
                message += ` 2023年回報：${fund.return2023}\n`;
            }
            
            if (fund.avgReturn) {
                message += ` 平均回報：${fund.avgReturn}\n`;
            } else if (fund.return5Y) { // 兼容舊版本
                message += ` 近五年回報：${fund.return5Y}\n`;
            }
            
            message += ` 基金規模：${fund.size}百萬港元\n`;
            message += ` 管理費用比率：${fund.fer}\n\n`;
        });
    } else {
        message += ` 暫無符合條件的基金\n\n`;
    }

    // 顯示混合資產基金建議
    message += `📊 混合資產基金 (建議配置${riskProfile.allocation.mixed}%)\n`;
    if (recommendedFunds.mixed.length > 0) {
        recommendedFunds.mixed.forEach(fund => {
            message += ` • ${fund.name}\n`;
            message += ` 風險級別：${fund.risk}\n`;
            
            // 根據新的數據結構顯示回報率
            if (fund.return2024) {
                message += ` 2024年回報：${fund.return2024}\n`;
            } else if (fund.return1Y) { // 兼容舊版本
                message += ` 近一年回報：${fund.return1Y}\n`;
            }
            
            if (fund.return2023) {
                message += ` 2023年回報：${fund.return2023}\n`;
            }
            
            if (fund.avgReturn) {
                message += ` 平均回報：${fund.avgReturn}\n`;
            } else if (fund.return5Y) { // 兼容舊版本
                message += ` 近五年回報：${fund.return5Y}\n`;
            }
            
            message += ` 基金規模：${fund.size}百萬港元\n`;
            message += ` 管理費用比率：${fund.fer}\n\n`;
        });
    } else {
        message += ` 暫無符合條件的基金\n\n`;
    }

    // 顯示債券基金建議
    message += `💰 債券基金 (建議配置${riskProfile.allocation.bonds}%)
`;
    if (recommendedFunds.bonds.length > 0) {
        recommendedFunds.bonds.forEach(fund => {
            message += ` • ${fund.name}
`;
            message += ` 風險級別：${fund.risk}
`;
            
            // 根據新的數據結構顯示回報率
            if (fund.return2024) {
                message += ` 2024年回報：${fund.return2024}
`;
            } else if (fund.return1Y) { // 兼容舊版本
                message += ` 近一年回報：${fund.return1Y}
`;
            }
            
            if (fund.return2023) {
                message += ` 2023年回報：${fund.return2023}
`;
            }
            
            if (fund.avgReturn) {
                message += ` 平均回報：${fund.avgReturn}
`;
            } else if (fund.return5Y) { // 兼容舊版本
                message += ` 近五年回報：${fund.return5Y}
`;
            }
            
            message += ` 基金規模：${fund.size}百萬港元
`;
            message += ` 管理費用比率：${fund.fer}

`;
        });
    } else {
        message += ` 暫無符合條件的基金

`;
    }
    
    // 顯示保證基金建議 (如果有配置)
    if (riskProfile.allocation.guaranteed && riskProfile.allocation.guaranteed > 0) {
        message += `🔒 保證基金 (建議配置${riskProfile.allocation.guaranteed}%)
`;
        const guaranteedFunds = companyFunds["保證基金"] || [];
        if (guaranteedFunds.length > 0) {
            guaranteedFunds.forEach(fund => {
                message += ` • ${fund.name}
`;
                message += ` 風險級別：${fund.risk}
`;
                
                // 根據新的數據結構顯示回報率
                if (fund.return2024) {
                    message += ` 2024年回報：${fund.return2024}
`;
                } else if (fund.return1Y) {
                    message += ` 近一年回報：${fund.return1Y}
`;
                }
                
                if (fund.return2023) {
                    message += ` 2023年回報：${fund.return2023}
`;
                }
                
                if (fund.avgReturn) {
                    message += ` 平均回報：${fund.avgReturn}
`;
                } else if (fund.return5Y) {
                    message += ` 近五年回報：${fund.return5Y}
`;
                }
                
                message += ` 基金規模：${fund.size}百萬港元
`;
                message += ` 管理費用比率：${fund.fer}

`;
            });
        } else {
            message += ` 暫無符合條件的保證基金

`;
        }
    }
    
    // 顯示貨幣市場基金建議 (如果有配置)
    if (riskProfile.allocation.money && riskProfile.allocation.money > 0) {
        message += `💵 貨幣市場基金 (建議配置${riskProfile.allocation.money}%)
`;
        const moneyFunds = companyFunds["貨幣市場基金"] || [];
        if (moneyFunds.length > 0) {
            moneyFunds.forEach(fund => {
                message += ` • ${fund.name}
`;
                message += ` 風險級別：${fund.risk}
`;
                
                // 根據新的數據結構顯示回報率
                if (fund.return2024) {
                    message += ` 2024年回報：${fund.return2024}
`;
                } else if (fund.return1Y) {
                    message += ` 近一年回報：${fund.return1Y}
`;
                }
                
                if (fund.return2023) {
                    message += ` 2023年回報：${fund.return2023}
`;
                }
                
                if (fund.avgReturn) {
                    message += ` 平均回報：${fund.avgReturn}
`;
                } else if (fund.return5Y) {
                    message += ` 近五年回報：${fund.return5Y}
`;
                }
                
                message += ` 基金規模：${fund.size}百萬港元
`;
                message += ` 管理費用比率：${fund.fer}

`;
            });
        } else {
            message += ` 暫無符合條件的貨幣市場基金

`;
        }
    }

    message += '您想了解更多關於這些基金的信息嗎？';
    addBotMessage(message, ['比較這些基金', '查看更多基金', '返回主選單']);
}

// 顯示基金比較
function showFundComparison() {
    document.getElementById('comparison-section').classList.remove('hidden');
    // ...其他顯示基金比較的代碼
}

// 初始化
window.onload = function() {
    addBotMessage(chatFlow.welcome.message);

    // 綁定發送按鈕事件
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            processUserInput(message);
            userInput.value = '';
        }
    });

    // 綁定輸入框回車事件
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
    
    // 關閉基金比較
    document.getElementById('close-comparison').addEventListener('click', () => {
        document.getElementById('comparison-section').classList.add('hidden');
    });
};

// 將函數暴露給全局，以便HTML中的onclick能訪問
window.handleOptionClick = handleOptionClick;
