class Tag < ActiveRecord::Base
  validates_presence_of :top, :left, :character

  CHARACTERS = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof']
  validates :character, inclusion: CHARACTERS
end
