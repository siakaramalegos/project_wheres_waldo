class TagsController < ApplicationController

  def index
    @tags = Tag.all

    respond_to do |format|
      format.json { render json: @tags }
    end
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      respond_to do |format|
        format.json { render json: @tag, status: :created }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: 400 }
      end
    end
  end

  def destroy

  end

  private

  def tag_params
    params.require(:tag).permit(:character, :top, :left)
  end

end
