# NextJS Image To Number

นี่เป็นโปรเจคสำหรับการนำ AI ( Deep leanring ) มาใช้งานในหน้าเว็บเพื่อทำนายตัวเลขที่เขียนลงไป ( รองรับแค่ 0 - 9 และอาจมีความผิดเนื่องจากถูกเทรนเพียง 15 epochs ) <br>
Model ตัวนี้ถูกเทรนด้วยข้อมูล MNIST <br>

## โครงสร้าง Layer
```py
model = models.Sequential([
    layers.Conv2D(8, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(16, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])
```

### วิธีการเทรนต่อ
```bash
python traning/main.py
```

### วิธีการรันหน้าเว็บ
สำหรับการ dev
```bash
npm run dev
```
