from flask import Flask, render_template, flash, request
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/checkout')
def checkout():
    return render_template('payment.html')

@app.route('/payment', methods=["POST"])
def payment():
    token = request.form['token']
    flash(f'Your token is: {token}')
    return "ok"

@app.route('/success')
def success():
    return render_template('success.html')