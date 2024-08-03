document.getElementById('expenseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('category', document.getElementById('category').value);
    formData.append('amount', document.getElementById('amount').value);
    formData.append('receipt', document.getElementById('receipt').files[0]);
    
    const response = await fetch('/api/expenses', {
        method: 'POST',
        body: formData
    });
    
    if (response.ok) {
        alert('Gasto registrado exitosamente');
    } else {
        alert('Error al registrar el gasto');
    }
});
