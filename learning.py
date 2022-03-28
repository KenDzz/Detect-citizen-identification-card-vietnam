from detecto import core, utils, visualize

dataset = core.Dataset('data/sample')
model = core.Model([
    'top_left', 'top_right', 'bottom_left', 'bottom_right', 'face' , 'cmnd' , 'blxm' , 'cccd'
])
losses = model.fit(dataset, epochs=1, verbose=True, learning_rate=0.001)
model.save('id_card_4_corner.pth')