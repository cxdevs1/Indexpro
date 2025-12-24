from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

def calculate_fit_score(candidate):
    score = 0
    if candidate.get('profitability', False):
        score += 40
    if candidate.get('market_cap_valid', False):
        score += 30
    if candidate.get('liquidity_valid', False):
        score += 20
    if candidate.get('sector_match', False):
        score += 10
    return score

VACANCY_DATA = [
    {'ticker': 'SNV', 'price': 45.20, 'riskTag': 'M&A TARGET', 'riskType': 'ma', 'probability': 92},
    {'ticker': 'ZION', 'price': 38.75, 'riskTag': 'MARKET CAP < $5B', 'riskType': 'cap', 'probability': 78},
    {'ticker': 'CBSH', 'price': 52.10, 'riskTag': 'M&A TARGET', 'riskType': 'ma', 'probability': 85},
    {'ticker': 'FNB', 'price': 13.45, 'riskTag': 'MARKET CAP < $5B', 'riskType': 'cap', 'probability': 71},
    {'ticker': 'UMBF', 'price': 89.30, 'riskTag': 'EARNINGS MISS', 'riskType': 'earnings', 'probability': 65},
    {'ticker': 'GBCI', 'price': 42.80, 'riskTag': 'DELISTING RISK', 'riskType': 'delist', 'probability': 58},
]

CANDIDATE_RAW_DATA = [
    {'ticker': 'PATH', 'name': 'UiPath Inc', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': True, 'upside': 12.5},
    {'ticker': 'BILL', 'name': 'Bill.com Holdings', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': False, 'upside': 9.5},
    {'ticker': 'MNDY', 'name': 'Monday.com Ltd', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': False, 'upside': 8.2},
    {'ticker': 'PCTY', 'name': 'Paylocity Holding', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': False, 'upside': 7.8},
    {'ticker': 'EEFT', 'name': 'Euronet Worldwide', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': False, 'sector_match': True, 'upside': 6.4},
    {'ticker': 'WEX', 'name': 'WEX Inc', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': False, 'sector_match': True, 'upside': 5.9},
    {'ticker': 'DUOL', 'name': 'Duolingo Inc', 'profitability': True, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': False, 'upside': 5.2},
    {'ticker': 'APPF', 'name': 'AppFolio Inc', 'profitability': True, 'market_cap_valid': False, 'liquidity_valid': True, 'sector_match': True, 'upside': 4.8},
    {'ticker': 'CWAN', 'name': 'Clearwater Analytics', 'profitability': False, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': True, 'upside': 4.1},
    {'ticker': 'FRSH', 'name': 'Freshworks Inc', 'profitability': False, 'market_cap_valid': True, 'liquidity_valid': True, 'sector_match': False, 'upside': 3.5},
]

EXECUTION_DATA = {
    'PATH': {'projectedVolume': 39400000, 'currentVolume': 26800000, 'avgDailyVolume': 4200000},
    'BILL': {'projectedVolume': 28500000, 'currentVolume': 19200000, 'avgDailyVolume': 3100000},
    'MNDY': {'projectedVolume': 22100000, 'currentVolume': 15400000, 'avgDailyVolume': 2800000},
    'PCTY': {'projectedVolume': 18900000, 'currentVolume': 12100000, 'avgDailyVolume': 2200000},
    'EEFT': {'projectedVolume': 15600000, 'currentVolume': 9800000, 'avgDailyVolume': 1900000},
    'WEX': {'projectedVolume': 12400000, 'currentVolume': 7500000, 'avgDailyVolume': 1600000},
}

@app.route('/api/vacancy', methods=['GET'])
def get_vacancies():
    return jsonify(VACANCY_DATA)

@app.route('/api/bench', methods=['GET'])
def get_bench():
    candidates = []
    for candidate in CANDIDATE_RAW_DATA:
        fit_score = calculate_fit_score(candidate)
        candidates.append({
            'ticker': candidate['ticker'],
            'name': candidate['name'],
            'fitScore': fit_score,
            'gaapProfitable': candidate['profitability'],
            'marketCap': candidate['market_cap_valid'],
            'liquidity': candidate['liquidity_valid'],
            'upside': candidate['upside']
        })
    
    candidates.sort(key=lambda x: x['fitScore'], reverse=True)
    
    for i, candidate in enumerate(candidates, 1):
        candidate['rank'] = i
    
    return jsonify(candidates)

@app.route('/api/execution/<ticker>', methods=['GET'])
def get_execution(ticker):
    ticker = ticker.upper()
    
    if ticker in EXECUTION_DATA:
        data = EXECUTION_DATA[ticker].copy()
        variation = random.uniform(-0.05, 0.05)
        data['currentVolume'] = int(data['currentVolume'] * (1 + variation))
        return jsonify(data)
    else:
        return jsonify({
            'projectedVolume': random.randint(10000000, 50000000),
            'currentVolume': random.randint(5000000, 30000000),
            'avgDailyVolume': random.randint(1000000, 5000000)
        })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
